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

    event JoinRequested(address indexed applicant);
    event MemberApproved(address indexed applicant);
    event ContributionMade(address indexed member, uint256 amount);

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

    mapping(address => Member) public members;
    mapping(address => JoinRequest) public joinRequests;
    mapping(address => uint256) public contributions;

    address[] public memberAddresses;
    address[] public pendingApplicants;

    Activity[] public activities;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
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

    // ============================================================
    // WRITE FUNCTIONS
    // ============================================================

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

    // ============================================================
    // VIEW FUNCTIONS
    // ============================================================

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
}