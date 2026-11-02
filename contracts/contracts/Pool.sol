
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Pool {
    uint256 public id;
    string public name;
    string public description;
    address public creator;
    address public admin;
    uint256 public memberCount;
    uint256 public totalContributions;
    uint256 public contributionAmount;

    uint256 private nextProposalId = 1;
    uint256 private nextLoanId = 1;

    uint256 public constant QUORUM_PERCENT = 50;
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant DEFAULT_GRACE_PERIOD = 30 days;
    uint256 public constant MAX_LATE_INTEREST_RATE = 100;
    uint256 public constant BASIS_POINTS = 10_000;

    bool private locked;

    event JoinRequested(address indexed applicant);
    event MemberApproved(address indexed applicant);

    event ContributionMade(
        address indexed member,
        uint256 amount
    );

    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalType proposalType,
        string title
    );

    event ProposalVoted(
        uint256 indexed proposalId,
        address indexed voter,
        bool support
    );

    event ProposalExecuted(uint256 indexed proposalId);

    event LoanRequested(
        uint256 indexed loanId,
        uint256 indexed proposalId,
        address indexed borrower,
        uint256 principal
    );

    event LoanDisbursed(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 principal
    );

    event LoanRepayment(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestPaid,
        uint256 principalPaid
    );

    event LoanCompleted(uint256 indexed loanId);

    event LoanDefaulted(uint256 indexed loanId);

    struct Member {
        address wallet;
        uint256 joinedAt;
        bool isActive;
    }

    struct JoinRequest {
        address applicant;
        uint256 requestedAt;
        bool pending;
    }

    struct PoolStats {
        uint256 memberCount;
        uint256 treasury;
        uint256 contributionAmount;
    }

    struct Activity {
        string action;
        address user;
        uint256 amount;
        uint256 timestamp;
    }

    struct Proposal {
        uint256 id;
        ProposalType proposalType;

        string title;
        string description;
        string evidenceURI;

        address proposer;

        address recipient;
        uint256 amount;

        uint256 newContributionAmount;
        address newAdmin;

        uint256 yesVotes;
        uint256 noVotes;

        uint256 endTime;
        uint256 createdAt;

        bool executed;
        uint256 totalVotes;

        uint256 loanId;
    }

    struct Vote {
        address voter;
        bool support;
        string reason;
        uint256 timestamp;
        uint256 votingPower;
    }

    struct Loan {
        uint256 id;
        uint256 proposalId;

        address borrower;

        uint256 principal;
        uint256 principalRepaid;
        uint256 interestPaid;
        uint256 accruedInterest;

        string purpose;

        uint256 createdAt;
        uint256 repaymentDeadline;

        // Basis points per day.
        // 100 = 1% per day.
        uint256 lateInterestRate;

        uint256 approvedAt;
        uint256 disbursedAt;
        uint256 lastInterestAccrualAt;

        LoanStatus status;
    }

    mapping(address => Member) public members;
    mapping(address => JoinRequest) public joinRequests;
    mapping(address => uint256) public contributions;

    mapping(uint256 => mapping(address => bool))
        public hasVoted;

    mapping(uint256 => Vote[]) private proposalVotes;

    mapping(uint256 => Loan) public loans;

    address[] public memberAddresses;
    address[] public pendingApplicants;

    Proposal[] public proposals;
    Activity[] public activities;

    uint256 public loanCount;

    enum ProposalType {
        WithdrawTreasury,
        ChangeContribution,
        TransferAdmin,
        LoanRequest
    }

    enum ProposalStatus {
        Active,
        Passed,
        Rejected,
        Executed,
        QuorumNotReached
    }

    enum LoanStatus {
        Pending,
        Approved,
        Active,
        Repaid,
        Rejected,
        Overdue,
        Defaulted
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyMember() {
        require(
            members[msg.sender].isActive,
            "Only members"
        );
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    constructor(
        uint256 _id,
        string memory _name,
        string memory _description,
        address _creator,
        uint256 _contributionAmount
    ) {
        id = _id;
        name = _name;
        description = _description;
        creator = _creator;
        admin = _creator;
        contributionAmount = _contributionAmount;

        members[_creator] = Member({
            wallet: _creator,
            joinedAt: block.timestamp,
            isActive: true
        });

        memberAddresses.push(_creator);
        memberCount = 1;
    }

    // --------------------------------------------------
    // MEMBERSHIP
    // --------------------------------------------------

    function applyToJoin() public {
        require(
            !members[msg.sender].isActive,
            "Already a member"
        );

        require(
            !joinRequests[msg.sender].pending,
            "Already applied"
        );

        joinRequests[msg.sender] = JoinRequest({
            applicant: msg.sender,
            requestedAt: block.timestamp,
            pending: true
        });

        pendingApplicants.push(msg.sender);

        activities.push(
            Activity({
                action: "Join Request",
                user: msg.sender,
                amount: 0,
                timestamp: block.timestamp
            })
        );

        emit JoinRequested(msg.sender);
    }

    function approveMember(
        address applicant
    ) public onlyAdmin {
        require(
            joinRequests[applicant].pending,
            "No pending application"
        );

        require(
            !members[applicant].isActive,
            "Already approved"
        );

        members[applicant] = Member({
            wallet: applicant,
            joinedAt: block.timestamp,
            isActive: true
        });

        memberAddresses.push(applicant);

        delete joinRequests[applicant];

        memberCount++;

        for (
            uint256 i = 0;
            i < pendingApplicants.length;
            i++
        ) {
            if (pendingApplicants[i] == applicant) {
                pendingApplicants[i] =
                    pendingApplicants[
                        pendingApplicants.length - 1
                    ];

                pendingApplicants.pop();
                break;
            }
        }

        activities.push(
            Activity({
                action: "Member Approved",
                user: applicant,
                amount: 0,
                timestamp: block.timestamp
            })
        );

        emit MemberApproved(applicant);
    }

    // --------------------------------------------------
    // CONTRIBUTIONS
    // --------------------------------------------------

    function contribute() public payable onlyMember {
        require(
            msg.value == contributionAmount,
            "Incorrect contribution amount"
        );

        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;

        activities.push(
            Activity({
                action: "Contribution",
                user: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        emit ContributionMade(
            msg.sender,
            msg.value
        );
    }

    // --------------------------------------------------
    // GOVERNANCE PROPOSALS
    // --------------------------------------------------

    function createWithdrawalProposal(
        string memory title,
        string memory proposalDescription,
        string memory evidenceURI,
        address recipient,
        uint256 amount
    ) public onlyMember {
        require(
            recipient != address(0),
            "Invalid recipient"
        );

        require(amount > 0, "Invalid amount");

        require(
            bytes(title).length > 0 &&
            bytes(title).length <= 100,
            "Invalid title"
        );

        require(
            bytes(proposalDescription).length > 0 &&
            bytes(proposalDescription).length <= 500,
            "Invalid description"
        );

        require(
            bytes(evidenceURI).length <= 300,
            "Evidence URI too long"
        );

        require(
            amount <= address(this).balance,
            "Insufficient treasury"
        );

        Proposal storage proposal = proposals.push();

        proposal.id = nextProposalId;
        proposal.proposalType =
            ProposalType.WithdrawTreasury;

        proposal.title = title;
        proposal.description = proposalDescription;
        proposal.evidenceURI = evidenceURI;

        proposal.proposer = msg.sender;
        proposal.recipient = recipient;
        proposal.amount = amount;

        proposal.createdAt = block.timestamp;
        proposal.endTime =
            block.timestamp + VOTING_PERIOD;

        emit ProposalCreated(
            nextProposalId,
            msg.sender,
            ProposalType.WithdrawTreasury,
            title
        );

        nextProposalId++;
    }

    function voteProposal(
        uint256 proposalId,
        bool support,
        string memory reason
    ) public onlyMember {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        Proposal storage proposal =
            proposals[proposalId - 1];

        require(
            getProposalStatus(proposalId) ==
                ProposalStatus.Active,
            "Proposal is not active"
        );

        require(
            !hasVoted[proposalId][msg.sender],
            "Already voted"
        );

        if (!support) {
            require(
                bytes(reason).length > 0,
                "Reason required for No vote"
            );

            require(
                bytes(reason).length <= 200,
                "Reason too long"
            );
        }

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        proposal.totalVotes++;

        proposalVotes[proposalId].push(
            Vote({
                voter: msg.sender,
                support: support,
                reason: reason,
                timestamp: block.timestamp,
                votingPower: 1
            })
        );

        emit ProposalVoted(
            proposalId,
            msg.sender,
            support
        );
    }

    function requiredQuorumVotes()
        public
        view
        returns (uint256)
    {
        return (
            memberCount * QUORUM_PERCENT + 99
        ) / 100;
    }

    function getProposalStatus(
        uint256 proposalId
    ) public view returns (ProposalStatus) {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        Proposal storage proposal =
            proposals[proposalId - 1];

        if (proposal.executed) {
            return ProposalStatus.Executed;
        }

        uint256 totalVotes =
            proposal.yesVotes + proposal.noVotes;

        uint256 requiredVotes =
            requiredQuorumVotes();

        // Quorum reached: result is immediate.
        if (totalVotes >= requiredVotes) {
            if (
                proposal.yesVotes >
                proposal.noVotes
            ) {
                return ProposalStatus.Passed;
            }

            return ProposalStatus.Rejected;
        }

        // Quorum not reached before deadline.
        if (block.timestamp >= proposal.endTime) {
            return ProposalStatus.QuorumNotReached;
        }

        return ProposalStatus.Active;
    }

    function executeProposal(
        uint256 proposalId
    ) public onlyMember nonReentrant {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        Proposal storage proposal =
            proposals[proposalId - 1];

        require(
            getProposalStatus(proposalId) ==
                ProposalStatus.Passed,
            "Proposal has not passed"
        );

        require(
            !proposal.executed,
            "Already executed"
        );

        proposal.executed = true;

        if (
            proposal.proposalType ==
            ProposalType.WithdrawTreasury
        ) {
            _executeWithdrawal(proposal);
        } else if (
            proposal.proposalType ==
            ProposalType.LoanRequest
        ) {
            _executeLoan(proposal);
        } else {
            revert("Unsupported proposal");
        }

        emit ProposalExecuted(proposalId);
    }

    function _executeWithdrawal(
        Proposal storage proposal
    ) internal {
        require(
            proposal.amount <= address(this).balance,
            "Insufficient treasury"
        );

        activities.push(
            Activity({
                action: "Treasury Withdrawal",
                user: proposal.recipient,
                amount: proposal.amount,
                timestamp: block.timestamp
            })
        );

        (bool success, ) = payable(
            proposal.recipient
        ).call{value: proposal.amount}("");

        require(success, "Transfer failed");
    }

    // --------------------------------------------------
    // LOAN REQUESTS
    // --------------------------------------------------

    function createLoanProposal(
        string memory title,
        string memory purpose,
        string memory evidenceURI,
        uint256 principal,
        uint256 repaymentDeadline,
        uint256 lateInterestRate
    ) public onlyMember {
        require(
            principal > 0,
            "Invalid loan amount"
        );

        require(
            principal <= address(this).balance,
            "Insufficient treasury"
        );

        require(
            repaymentDeadline > block.timestamp,
            "Invalid repayment deadline"
        );

        require(
            lateInterestRate <= MAX_LATE_INTEREST_RATE,
            "Late interest rate too high"
        );

        require(
            bytes(title).length > 0 &&
            bytes(title).length <= 100,
            "Invalid title"
        );

        require(
            bytes(purpose).length > 0 &&
            bytes(purpose).length <= 500,
            "Invalid purpose"
        );

        require(
            bytes(evidenceURI).length <= 300,
            "Evidence URI too long"
        );

        uint256 loanId = nextLoanId++;
        uint256 proposalId = nextProposalId++;

        loans[loanId] = Loan({
            id: loanId,
            proposalId: proposalId,
            borrower: msg.sender,
            principal: principal,
            principalRepaid: 0,
            interestPaid: 0,
            accruedInterest: 0,
            purpose: purpose,
            createdAt: block.timestamp,
            repaymentDeadline: repaymentDeadline,
            lateInterestRate: lateInterestRate,
            approvedAt: 0,
            disbursedAt: 0,
            lastInterestAccrualAt: repaymentDeadline,
            status: LoanStatus.Pending
        });

        loanCount++;

        Proposal storage proposal = proposals.push();

        proposal.id = proposalId;
        proposal.proposalType = ProposalType.LoanRequest;

        proposal.title = title;
        proposal.description = purpose;
        proposal.evidenceURI = evidenceURI;

        proposal.proposer = msg.sender;
        proposal.recipient = msg.sender;
        proposal.amount = principal;

        proposal.createdAt = block.timestamp;
        proposal.endTime =
            block.timestamp + VOTING_PERIOD;

        proposal.loanId = loanId;

        emit ProposalCreated(
            proposalId,
            msg.sender,
            ProposalType.LoanRequest,
            title
        );

        emit LoanRequested(
            loanId,
            proposalId,
            msg.sender,
            principal
        );
    }

    function _executeLoan(
        Proposal storage proposal
    ) internal {
        Loan storage loan = loans[proposal.loanId];

        require(
            loan.status == LoanStatus.Pending,
            "Loan is not pending"
        );

        require(
            loan.repaymentDeadline > block.timestamp,
            "Repayment deadline passed"
        );

        require(
            loan.principal <= address(this).balance,
            "Insufficient treasury"
        );

        loan.status = LoanStatus.Approved;
        loan.approvedAt = block.timestamp;
        loan.disbursedAt = block.timestamp;

        loan.status = LoanStatus.Active;

        activities.push(
            Activity({
                action: "Loan Disbursement",
                user: loan.borrower,
                amount: loan.principal,
                timestamp: block.timestamp
            })
        );

        (bool success, ) = payable(
            loan.borrower
        ).call{value: loan.principal}("");

        require(
            success,
            "Loan disbursement failed"
        );

        emit LoanDisbursed(
            loan.id,
            loan.borrower,
            loan.principal
        );
    }

    // --------------------------------------------------
    // LOAN REPAYMENTS AND LATE INTEREST
    // --------------------------------------------------

    function repayLoan(
        uint256 loanId
    ) public payable nonReentrant {
        Loan storage loan = loans[loanId];

        require(
            loan.id != 0,
            "Loan does not exist"
        );

        require(
            msg.sender == loan.borrower,
            "Only borrower can repay"
        );

        require(
            loan.status == LoanStatus.Active ||
            loan.status == LoanStatus.Overdue ||
            loan.status == LoanStatus.Defaulted,
            "Loan cannot be repaid"
        );

        require(
            msg.value > 0,
            "Payment required"
        );

        // Calculate late interest before allocating payment.
        _accrueLateInterest(loan);

        uint256 interestOutstanding =
            loan.accruedInterest - loan.interestPaid;

        uint256 principalOutstanding =
            loan.principal - loan.principalRepaid;

        uint256 totalOutstanding =
            interestOutstanding + principalOutstanding;

        // Payments settle interest first.
        uint256 interestPayment = msg.value;

        if (interestPayment > interestOutstanding) {
            interestPayment = interestOutstanding;
        }

        loan.interestPaid += interestPayment;

        uint256 remainingPayment =
            msg.value - interestPayment;

        uint256 principalPayment = remainingPayment;

        if (principalPayment > principalOutstanding) {
            principalPayment = principalOutstanding;
        }

        loan.principalRepaid += principalPayment;

        activities.push(
            Activity({
                action: "Loan Repayment",
                user: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        emit LoanRepayment(
            loanId,
            msg.sender,
            msg.value,
            interestPayment,
            principalPayment
        );

        if (
            loan.principalRepaid == loan.principal &&
            loan.interestPaid == loan.accruedInterest
        ) {
            loan.status = LoanStatus.Repaid;

            emit LoanCompleted(loanId);
        } else if (
            block.timestamp > loan.repaymentDeadline
        ) {
            loan.status = LoanStatus.Overdue;
        } else {
            loan.status = LoanStatus.Active;
        }
    }

    function _accrueLateInterest(
        Loan storage loan
    ) internal {
        if (
            block.timestamp <= loan.repaymentDeadline
        ) {
            return;
        }

        uint256 accrualStart =
            loan.lastInterestAccrualAt;

        if (accrualStart < loan.repaymentDeadline) {
            accrualStart = loan.repaymentDeadline;
        }

        if (block.timestamp <= accrualStart) {
            return;
        }

        uint256 principalOutstanding =
            loan.principal - loan.principalRepaid;

        uint256 elapsed =
            block.timestamp - accrualStart;

        uint256 newInterest =
            (
                principalOutstanding *
                loan.lateInterestRate *
                elapsed
            ) / (BASIS_POINTS * 1 days);

        loan.accruedInterest += newInterest;

        loan.lastInterestAccrualAt = block.timestamp;

        if (
            principalOutstanding > 0 ||
            loan.interestPaid < loan.accruedInterest
        ) {
            loan.status = LoanStatus.Overdue;
        }
    }

    function markLoanDefaulted(
        uint256 loanId
    ) public onlyAdmin {
        Loan storage loan = loans[loanId];

        require(
            loan.id != 0,
            "Loan does not exist"
        );

        require(
            loan.status == LoanStatus.Active ||
            loan.status == LoanStatus.Overdue,
            "Loan cannot be defaulted"
        );

        require(
            block.timestamp >=
                loan.repaymentDeadline + DEFAULT_GRACE_PERIOD,
            "Grace period not completed"
        );

        _accrueLateInterest(loan);

        require(
            loan.principalRepaid < loan.principal ||
            loan.interestPaid < loan.accruedInterest,
            "Loan already settled"
        );

        loan.status = LoanStatus.Defaulted;

        emit LoanDefaulted(loanId);
    }

    // --------------------------------------------------
    // LOAN READ FUNCTIONS
    // --------------------------------------------------

    function getLoan(
        uint256 loanId
    ) public view returns (Loan memory) {
        require(
            loans[loanId].id != 0,
            "Loan does not exist"
        );

        return loans[loanId];
    }

    function getLoans()
        public
        view
        returns (Loan[] memory)
    {
        Loan[] memory result =
            new Loan[](loanCount);

        for (
            uint256 i = 1;
            i <= loanCount;
            i++
        ) {
            result[i - 1] = loans[i];
        }

        return result;
    }

    function getLoanStatus(
        uint256 loanId
    ) public view returns (LoanStatus) {
        Loan storage loan = loans[loanId];

        require(
            loan.id != 0,
            "Loan does not exist"
        );

        if (
            loan.status == LoanStatus.Active &&
            block.timestamp > loan.repaymentDeadline
        ) {
            return LoanStatus.Overdue;
        }

        return loan.status;
    }

    function getLoanAmountsDue(
        uint256 loanId
    )
        public
        view
        returns (
            uint256 principalOutstanding,
            uint256 interestOutstanding,
            uint256 totalOutstanding
        )
    {
        Loan storage loan = loans[loanId];

        require(
            loan.id != 0,
            "Loan does not exist"
        );

        principalOutstanding =
            loan.principal - loan.principalRepaid;

        uint256 projectedInterest =
            loan.accruedInterest;

        if (
            block.timestamp > loan.repaymentDeadline &&
            principalOutstanding > 0
        ) {
            uint256 accrualStart =
                loan.lastInterestAccrualAt;

            if (
                accrualStart < loan.repaymentDeadline
            ) {
                accrualStart = loan.repaymentDeadline;
            }

            if (block.timestamp > accrualStart) {
                uint256 elapsed =
                    block.timestamp - accrualStart;

                projectedInterest += (
                    principalOutstanding *
                    loan.lateInterestRate *
                    elapsed
                ) / (BASIS_POINTS * 1 days);
            }
        }

        interestOutstanding =
            projectedInterest - loan.interestPaid;

        totalOutstanding =
            principalOutstanding + interestOutstanding;
    }

    // --------------------------------------------------
    // GENERAL READ FUNCTIONS
    // --------------------------------------------------

    function isMember(
        address user
    ) public view returns (bool) {
        return members[user].isActive;
    }

    function hasPendingRequest(
        address user
    ) public view returns (bool) {
        return joinRequests[user].pending;
    }

    function getPendingApplicants()
        public
        view
        returns (address[] memory)
    {
        return pendingApplicants;
    }

    function getMembers()
        public
        view
        returns (address[] memory)
    {
        return memberAddresses;
    }

    function getActivities()
        public
        view
        returns (Activity[] memory)
    {
        return activities;
    }

    function getProposals()
        public
        view
        returns (Proposal[] memory)
    {
        return proposals;
    }

    function getProposalVotes(
        uint256 proposalId
    ) public view returns (Vote[] memory) {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        return proposalVotes[proposalId];
    }

    function getContribution(
        address user
    ) public view returns (uint256) {
        return contributions[user];
    }

    function getTreasuryBalance()
        public
        view
        returns (uint256)
    {
        return address(this).balance;
    }

    function getPoolInfo()
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            uint256,
            uint256
        )
    {
        return (
            id,
            name,
            description,
            creator,
            contributionAmount,
            memberCount
        );
    }

    function getPoolStats()
        public
        view
        returns (PoolStats memory)
    {
        return PoolStats({
            memberCount: memberCount,
            treasury: address(this).balance,
            contributionAmount: contributionAmount
        });
    }

    function getMemberInfo(
        address user
    )
        public
        view
        returns (
            bool isActive,
            uint256 totalSaved,
            bool pending
        )
    {
        return (
            members[user].isActive,
            contributions[user],
            joinRequests[user].pending
        );
    }
}
