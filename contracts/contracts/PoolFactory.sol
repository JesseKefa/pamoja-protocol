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

    function createPool(
        string memory name,
        string memory description
    ) public {
        uint256 poolId = nextPoolId;
    }

    Pool newPool = new Pool(
        poolId,
        name,
        description,
        msg.sender
    )


    }