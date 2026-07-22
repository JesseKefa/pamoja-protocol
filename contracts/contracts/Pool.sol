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

    mapping(address => Member) public members;
    mapping(address => JoinRequest) public joinRequests;
    mapping(address => uint256) public contributions;

    // NEW: Keep track of pending applicants
    address[] public pendingApplicants;

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

        emit JoinRequested(msg.sender);
    }

    function approveMember(address applicant) public onlyAdmin {
        require(joinRequests[applicant].pending, "No pending application");

        members[applicant] = Member({
            wallet: applicant,
            joinedAt: block.timestamp,
            isActive: true
        });

        delete joinRequests[applicant];

        memberCount++;

        // Remove applicant from pending list
        for (uint256 i = 0; i < pendingApplicants.length; i++) {
            if (pendingApplicants[i] == applicant) {
                pendingApplicants[i] = pendingApplicants[
                    pendingApplicants.length - 1
                ];
                pendingApplicants.pop();
                break;
            }
        }

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

        emit ContributionMade(msg.sender, msg.value);
    }

    function hasPendingRequest(address user) public view returns (bool) {
        return joinRequests[user].pending;
    }

    // ============================
    // VIEW FUNCTIONS
    // ============================

    function isMember(address user) public view returns (bool) {
        return members[user].isActive;
    }

    function getPendingApplicants()
        public
        view
        returns (address[] memory)
    {
        return pendingApplicants;
    }

    function getTreasuryBalance() public view returns (uint256) {
        return totalContributions;
    }
}