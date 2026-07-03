  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Pool {
    uint256 public id;
    string public name;
    string public description;
    address public creator;
    address public admin;
    uint256 public memberCount;

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

modifier onlyAdmin() {
    require(msg.sender == admin, "Only admin");
    _;
}

constructor (
    uint256 _id,
    string memory _name,
    string memory _description,
    address _creator
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

    }
}