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

    event JoinRequested(
        address indexed applicant);
    event MemberApproved(
        address indexed applicant);
    event ContributionMade(
        address indexed member, uint256 amount);
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
    event ProposalExecuted(
        uint256 indexed proposalId
    );

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

        uint256 createdAt

        bool executed;

        uint256 totalVotes;
    }

    struct Vote {
    address voter;
    bool support;
    string reason;
    uint256 timestamp;
    uint256 votingPower;
}

    mapping(address => Member) public members;
    mapping(address => JoinRequest) public joinRequests;
    mapping(address => uint256) public contributions;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    address[] public memberAddresses;
    address[] public pendingApplicants;
    Proposal[] public proposals;

    mapping(uint256 => Vote[]) private proposalVotes;

    Activity[] public activities;

    enum ProposalType {
        WithdrawTreasury,
        ChangeContribution,
        TransferAdmin
    }

    enum ProposalStatus {
        Active,
        Passed,
        Rejected,
        Executed,
        QuorumNotReached
    }

    uint256 private nextProposalId = 1;
    uint256 public constant QUORUM_PERCENT = 50;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyMember() {
    require(members[msg.sender].isActive, "Only members");
    _;
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


    function applyToJoin() public {
        require(!members[msg.sender].isActive, "Already a member");
        require(!joinRequests[msg.sender].pending, "Already applied");

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

    function approveMember(address applicant) public onlyAdmin {
        require(joinRequests[applicant].pending, "No pending application");
        require(!members[applicant].isActive, "Already approved");

        members[applicant] = Member({
            wallet: applicant,
            joinedAt: block.timestamp,
            isActive: true
        });

        memberAddresses.push(applicant);

        delete joinRequests[applicant];

        memberCount++;

        for (uint256 i = 0; i < pendingApplicants.length; i++) {
            if (pendingApplicants[i] == applicant) {
                pendingApplicants[i] =
                    pendingApplicants[pendingApplicants.length - 1];
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

    function contribute() public payable {
        require(members[msg.sender].isActive, "Not a member");
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

        emit ContributionMade(msg.sender, msg.value);
    }

    function createWithdrawalProposal(
        string memory title,
        string memory proposalDescription,
        string memory evidenceURI,
        address recipient,
        uint256 amount
    )
        public
        onlyMember
    {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        require(
            bytes(title).length > 0,
            "Title required"
        );

        require(
            bytes(title).length <= 100,
            "Title too long"
        );

        require(
            bytes(proposalDescription).length > 0,
            "Description required"
        );

        require(
            bytes(proposalDescription).length <= 500,
            "Description too long"
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
        proposal.proposalType = ProposalType.WithdrawTreasury;

        proposal.title = title;
        proposal.description = proposalDescription;
        proposal.evidenceURI = evidenceURI;

        proposal.proposer = msg.sender;

        proposal.recipient = recipient;
        proposal.amount = amount;

        proposal.newContributionAmount = 0;
        proposal.newAdmin = address(0);

        proposal.yesVotes = 0;
        proposal.noVotes = 0;

        proposal.createdAt = block.timestamp;

        proposal.endTime = block.timestamp + 3 days;

        proposal.executed = false;

        proposal.totalVotes = 0;

        emit ProposalCreated(
            nextProposalId,
            msg.sender,
            ProposalType.WithdrawTreasury,
            title
        );

        nextProposalId++;
    }


    function isMember(address user)
        public
        view
        returns (bool)
    {
        return members[user].isActive;
    }

    function hasPendingRequest(address user)
        public
        view
        returns (bool)
    {
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
    )
        public
        view
        returns (Vote[] memory)
    {
        return proposalVotes[proposalId];
    }

    function getContribution(address user)
        public
        view
        returns (uint256)
    {
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

    function requiredQuorumVotes()
        public
        view
        returns (uint256)
    {
        return (memberCount * QUORUM_PERCENT + 99) / 100;
    }

    function getProposalStatus(
        uint256 proposalId
    )
        public
        view
        returns (ProposalStatus)
    {
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

        if (block.timestamp < proposal.endTime) {
            return ProposalStatus.Active;
        }

        uint256 totalVotes =
            proposal.yesVotes +
            proposal.noVotes;

        if (
            totalVotes <
            requiredQuorumVotes()
        ) {
            return ProposalStatus.QuorumNotReached;
        }

        if (
            proposal.yesVotes >
            proposal.noVotes
        ) {
            return ProposalStatus.Passed;
        }

        return ProposalStatus.Rejected;
    }

    function getMemberInfo(address user)
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
    function voteProposal(
        uint256 proposalId,
        bool support,
        string memory reason
    )
        public
        onlyMember
    {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        Proposal storage proposal =
            proposals[proposalId - 1];

        require(
            block.timestamp < proposal.endTime,
            "Voting ended"
        );

        require(
            !proposal.executed,
            "Already executed"
        );

        require(
            !hasVoted[proposalId][msg.sender],
            "Already voted"
        );

        hasVoted[proposalId][msg.sender] = true;

        if (support) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        proposal.totalVotes++;

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

                proposalVotes[proposalId].push(
                    Vote({
                        voter: msg.sender,
                        support: support,
                        reason: reason,
                        timestamp: block.timestamp
                        votingPower: 1
                    })
                );

        emit ProposalVoted(
            proposalId,
            msg.sender,
            support
        );
    }

    function executeProposal(
        uint256 proposalId
    )
        public
        onlyMember
    {
        require(
            proposalId > 0 &&
            proposalId <= proposals.length,
            "Invalid proposal"
        );

        Proposal storage proposal =
            proposals[proposalId - 1];

        require(
            block.timestamp >= proposal.endTime,
            "Voting still active"
        );

        require(
            !proposal.executed,
            "Already executed"
        );

        uint256 totalVotes =
            proposal.yesVotes +
            proposal.noVotes;

        
        uint256 requiredVotes =
            requiredQuorumVotes();

        require(
            totalVotes >= requiredVotes,
            "Quorum not reached"
        );

        require(
            proposal.yesVotes > proposal.noVotes,
            "Proposal rejected"
        );

        require(
            proposal.proposalType ==
                ProposalType.WithdrawTreasury,
            "Unsupported proposal"
        );

        require(
            proposal.amount <= address(this).balance,
            "Insufficient treasury"
        );

        proposal.executed = true;

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

        emit ProposalExecuted(proposalId);
    }



}