import { expect } from "chai";
import { ethers } from 'hardhat';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { TokenBurnableUpgradeable, TokenUpgradeable } from "../typechain-types";
import { formatEther, formatUnits, parseEther } from "ethers";

describe("Upgradeable Token Contract", ()=>{
    async function deployTokenFixture() {
        const [signer, account]= await ethers.getSigners()
        
        const Token = await ethers.deployContract("TokenUpgradeable");
        const Proxy = await ethers.deployContract("TokenProxy", [await Token.getAddress(), Buffer.from("")]);
        const TokenBurnable = await ethers.deployContract("TokenBurnableUpgradeable");

        const proxy = Token.attach(Proxy) as TokenUpgradeable;
        const ProxyWithBurnable = TokenBurnable.attach(proxy) as TokenBurnableUpgradeable;
        await proxy.initialize(signer);

        return {Proxy: proxy, ProxyWithBurnable, Token, TokenBurnable, signer, account};
    }

    describe("initialize", ()=>{
        it("should have given metadata", async ()=>{
            const metadata = {
                name: "TEST",
                symbol: "TT",
            };

            const {Proxy} = await loadFixture(deployTokenFixture);

            const proxyName = await Proxy.name();
            const proxySymbol = await Proxy.symbol();

            expect({name: proxyName, symbol: proxySymbol}).to.be.eql(metadata);
        })

        it("should have same amount of supply", async ()=>{
            const targetSupply = 5_000_000_000_000000000000000000n;
            
            const { Proxy } = await loadFixture(deployTokenFixture);

            const totalSupply = await Proxy.totalSupply();

            expect(totalSupply).to.be.equal(targetSupply);
        })
    })

    describe("Transfer", ()=>{
        it("should transfer token to given account", async ()=> {
            const { Proxy, signer, account } = await loadFixture(deployTokenFixture);
            const targetDiffAmount = "5.0";
            
            const beforeBalance = await Proxy.balanceOf(signer);
            await Proxy.transfer(account, parseEther("5.0"));
            const afterBalance = await Proxy.balanceOf(signer);

            expect(formatEther(beforeBalance - afterBalance)).to.be.equal(targetDiffAmount)
        })
    })

    describe("Upgradeable", ()=>{
        it("should not accept calling 'burn' method before upgrade", async ()=>{
            const { ProxyWithBurnable } = await loadFixture(deployTokenFixture);
            
            await expect(ProxyWithBurnable.burn(parseEther("5.0"))).to.be.revertedWithoutReason();
        })

        it("should accept calling 'burn' method after upgrade", async ()=>{
            const { ProxyWithBurnable, TokenBurnable, signer } = await loadFixture(deployTokenFixture);
            const targetDiffAmount = "0.5"

            await ProxyWithBurnable.upgradeToAndCall(TokenBurnable, Buffer.from(""));

            const beforeBalance = await ProxyWithBurnable.balanceOf(signer);
            await ProxyWithBurnable.burn(parseEther(targetDiffAmount));
            const afterBalance = await ProxyWithBurnable.balanceOf(signer);

            expect(formatEther(beforeBalance - afterBalance)).to.be.equals(targetDiffAmount);
        })
    })
})