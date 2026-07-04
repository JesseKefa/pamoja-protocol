import { ethers } from "hardhat";

async function main() {
  const PoolFactory = await ethers.getContractFactory("PoolFactory");

  const poolFactory = await PoolFactory.deploy();

  await poolFactory.waitForDeployment();

  console.log(
    "PoolFactory deployed to:",
    await poolFactory.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});