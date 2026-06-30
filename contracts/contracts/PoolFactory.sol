// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Pool.sol";
contract PoolFactory {

    struct PoolInfo {
        uint256 id;
        string name;
        string description;
        address creator;
        address poolAddress;
        uint256 createdAt;
        bool isActive;
     }

    PoolInfo[] public pools;

    uint256 private nextPoolId = 1;
    
    event PoolCreated(
        uint256 indexed id,
        address indexed creator,
        address poolAddress,
        string name
    );

    function createPool(
    string memory name,
    string memory description
    ) public {
        uint256 poolId = nextPoolId;

    Pool newPool = new Pool(
        poolId,
        name,
        description,
        msg.sender
    );

    pools.push(
        PoolInfo({
            id: poolId,
            name: name,
            description: description,
            creator: msg.sender,
            poolAddress: address(newPool),
            createdAt: block.timestamp,
            isActive: true
    })
    );

    nextPoolId++;

    emit PoolCreated(
        poolId,
        msg.sender,
        address(newPool),
        name
    );


    }
