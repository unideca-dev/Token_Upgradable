import { Interface } from "ethers";
import TokenUpgradeableABI from "../artifacts/contracts/TokenUpgradeable.sol/TokenUpgradeable.json";
import { vars } from "hardhat/config";

const WALLET_PK = vars.get("WALLET_PK", "");

const TokenIface = new Interface(TokenUpgradeableABI.abi);
const initializeData = TokenIface.getFunction('initialize', [WALLET_PK])
// 0xc4d66de8000000000000000000000000b6f10D81430BEC976276B0AF1930d82B1d1ec117
// console.log(initializeData);    

export default [
    "0xb6f10D81430BEC976276B0AF1930d82B1d1ec117", // implement address
    "0xc4d66de80000000000000000000000002952bee27b5051f48596f5157ac999d7a7792248", // arg: bytecode
]