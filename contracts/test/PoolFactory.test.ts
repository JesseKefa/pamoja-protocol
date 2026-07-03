import { expect } from "chai";
import hre from "hardhat";


describe("PoolFactory", function () {

    it("should start with zero pools", async function () {

        const PoolFactory = await ethers.getContractFactory("PoolFactory");
        const poolFactory = await PoolFactory.deploy();

        const poolCount = await poolFactory.getPoolCount();

        expect(poolCount).to.equal(0);

    });

    it("should create a new community", async function () {
        
    });

    it("should have the correct number of communities after creation", async function () {
        
    });

});
