import { vars } from "hardhat/config"
import { NetworkUserConfig } from "hardhat/types"

const NODE_REAL_API_KEY = vars.get("NODE_REAL_API_KEY", "");
const WALLET_PK = vars.get("BSC_WALLET_PK", "") ;

const network: NetworkUserConfig = {
    chainId: 56,
    url: `https://bsc-mainnet.nodereal.io/v1/${NODE_REAL_API_KEY}`,
    accounts: [WALLET_PK]
} 

export default network