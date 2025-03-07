import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenBurnableUpgradeableModule = buildModule("TokenBurnable", (m)=> {
    const TokenBurnable = m.contract("TokenBurnableUpgradeable");

    return {TokenBurnable}
})

export default TokenBurnableUpgradeableModule