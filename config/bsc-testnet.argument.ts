import { Interface } from "ethers";
import TokenUpgradeableABI from "../artifacts/contracts/TokenUpgradeable.sol/TokenUpgradeable.json";
import { vars } from "hardhat/config";

const WALLET_PK = vars.get("WALLET_PK", "");

const TokenIface = new Interface(TokenUpgradeableABI.abi);
const initializeData = TokenIface.getFunction('initialize', [WALLET_PK])
// 0xc4d66de80000000000000000000000002952bee27b5051f48596f5157ac999d7a7792248
// console.log(initializeData);    

export default [
    "0x65f870B5D8F0c7402B5D8a13E8E2E06Cd86EaA33",
    "0xc4d66de80000000000000000000000002952bee27b5051f48596f5157ac999d7a7792248",
]