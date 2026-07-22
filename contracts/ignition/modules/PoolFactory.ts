import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PoolFactoryModule = buildModule("PoolFactoryModule", (m) => {
  const poolFactory = m.contract("PoolFactory");

  return { poolFactory };
});

export default PoolFactoryModule;