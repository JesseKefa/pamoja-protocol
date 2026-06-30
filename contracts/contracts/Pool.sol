// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Pool {
    uint256 public id;
    string public name;
    string public description;
    address public creator;

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
    } 
}
