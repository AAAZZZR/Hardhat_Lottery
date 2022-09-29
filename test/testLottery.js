const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");
// const {
//     time,
//     loadFixture,
//   } = require("@nomicfoundation/hardhat-network-helpers");

describe("Lottery ", function() {
    let Lottery,lotteryContract,owner,addr1,addr2,addr3,addrs;
    beforeEach(async function(){
        Lottery = await ethers.getContractFactory("Lottery");
        [owner,addr1,addr2,addr3,...addrs] = await ethers.getSigners();
        const lotteryContract = await Lottery.deploy();
        await lotteryContract.deployed();
        console.log(
            `The contract address is ${lotteryContract.address} `
          );
    })

    
    describe("deployment",function(){
        it("should set the right onwer",async function(){
            expect(await lotteryContract.owner()).to.equal(owner.address)
        })
    })
    describe("recieve function",function(){
        it("Should recieve right amount of ETH",async function(){
            // await addr1.sendTransaction
            // ({to:lotteryContract.address,
            //   value: ethers.utils.parseEther("1")});

            expect(await lotteryContract.get_Balance()).to.equal(0);
        })
    })

    

})