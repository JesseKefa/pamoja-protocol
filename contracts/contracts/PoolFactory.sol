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
        uint256 contributionAmount;
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
    string memory description,
    uint256 contributionAmount
    ) public {
        uint256 poolId = nextPoolId;

    Pool newPool = new Pool(
        poolId,
        name,
        description,
        msg.sender,
        contributionAmount
    );

    pools.push(
        PoolInfo({
            id: poolId,
            name: name,
            description: description,
            creator: msg.sender,
            poolAddress: address(newPool),
            contributionAmount: contributionAmount,
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

    function getPoolCount() public view returns (uint256) {
        return pools.length;
    }

    function getPoolById(uint256 id) public view returns (PoolInfo memory) {
        require(id > 0 && id < nextPoolId, "Pool does not exist");

        return pools[id - 1];
    }

    function getAllPools() public view returns (PoolInfo[] memory) {
        return pools;
    }


}