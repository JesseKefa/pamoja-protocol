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

modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin");
    _;
}

constructor (
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

emit MemberApproved(applicant);

    }

function contribute() public payable {
    require(members[msg.sender].isActive, "Not a member");
    require(msg.value > 0, "Contribution must be greater than zero");
    require(msg.value == conmtributionAmount, "Incorrect contribution amount");

    contributions[msg.sender] += msg.value;
    totalContributions += msg.value;

    emit ContributionMade(msg.sender, msg.value);
}

}