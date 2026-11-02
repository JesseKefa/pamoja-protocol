
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PoolFactory", function () {
  let poolFactory: any;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const PoolFactory = await ethers.getContractFactory(
      "PoolFactory"
    );

    poolFactory = await PoolFactory.deploy();
    await poolFactory.waitForDeployment();
  });

  it("should start with zero pools", async function () {
    expect(await poolFactory.getPoolCount()).to.equal(0);
  });

  it("should create a new community", async function () {
    await poolFactory.createPool(
      "Asili Chama",
      "My first decentralized chama",
      ethers.parseEther("0.1")
    );

    expect(await poolFactory.getPoolCount()).to.equal(1);
  });

  it("should store the correct community information", async function () {
    const contribution = ethers.parseEther("0.1");

    await poolFactory.createPool(
      "Asili Chama",
      "My first decentralized chama",
      contribution
    );

    const pool = await poolFactory.getPoolById(1);

    expect(pool.name).to.equal("Asili Chama");
    expect(pool.description).to.equal(
      "My first decentralized chama"
    );
    expect(pool.creator).to.equal(owner.address);
    expect(pool.contributionAmount).to.equal(contribution);
    expect(pool.isActive).to.equal(true);
  });

  it("should assign sequential community IDs", async function () {
    await poolFactory.createPool(
      "Asili Chama",
      "First community",
      ethers.parseEther("0.1")
    );

    await poolFactory.createPool(
      "Umoja Chama",
      "Second community",
      ethers.parseEther("0.2")
    );

    expect(await poolFactory.getPoolCount()).to.equal(2);

    const first = await poolFactory.getPoolById(1);
    const second = await poolFactory.getPoolById(2);

    expect(first.id).to.equal(1);
    expect(second.id).to.equal(2);
  });
});
