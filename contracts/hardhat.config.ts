import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
      evmVersion: "cancun",
    },
  },

  networks: {
    hardhat: {},

    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,

      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
  },
};

export default config;