import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";

import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      blast_sepolia: "blast_sepolia", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "blast_sepolia",
        chainId: 168587773,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://testnet.blastscan.io",
        },
      },
      {
        network: "blast",
        chainId: 81457,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://blastscan.io",
        },
      },
    ],
  },
  networks: {
    blast_mainnet: {
      url: "https://rpc.blast.io",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for Sepolia testnet
    blast_sepolia: {
      url: "https://sepolia.blast.io",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for local dev environment
    blast_local: {
      url: "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
