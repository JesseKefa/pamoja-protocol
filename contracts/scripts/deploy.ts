import { ethers } from "hardhat";

async function main() {
  console.log("Deploying PoolFactory to Avalanche Fuji...");

  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);

  const balance = await ethers.provider.getBalance(
    deployer.address
  );

  console.log(
    "Deployer balance:",
    ethers.formatEther(balance),
    "AVAX"
  );

  const PoolFactory =
    await ethers.getContractFactory("PoolFactory");

  const poolFactory = await PoolFactory.deploy();

  await poolFactory.waitForDeployment();

  const address = await poolFactory.getAddress();

  console.log("PoolFactory deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});