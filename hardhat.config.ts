import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@openzeppelin/hardhat-upgrades";

import bscNetwork from "./config/bsc.config";
import bscTestNetwork from "./config/bsc-testnet.config";

const BSCSCAN_API_KEY = vars.get("BSCSCAN_API_KEY", "");

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    "bsc": bscNetwork,
    "bsc-testnet": bscTestNetwork,
  },
  etherscan: {
    apiKey: {
      "bsc-testnet": BSCSCAN_API_KEY,
    },
    customChains: [
      {
        network: "bsc-testnet",
        chainId: 97,
        urls: {
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com/"
        }
      }
    ]
  },
  sourcify: {
    enabled: true,
  }
};

export default config;
