import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenUpgradeableModule = buildModule("TokenUpgradeable", (m)=>{
    const TokenUpgradeable = m.contract("TokenUpgradeable");

    const initializeCall = m.encodeFunctionCall(TokenUpgradeable, 'initialize', [m.getAccount(0)])

    const TokenProxy = m.contract("TokenProxy", [TokenUpgradeable, initializeCall])

    return {TokenUpgradeable, TokenProxy};
})
export default TokenUpgradeableModule