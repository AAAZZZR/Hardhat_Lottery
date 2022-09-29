// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

async function getBalance(address){
  
  const balanceNum = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceNum);
}

async function printBalance(addresses){
  let idx = 0;
  for (const address of addresses ) {
    console.log(`Address ${idx} balance is`,await getBalance(address) ) //await getBalance(addresses[i].address));
    idx++;
  }
}
async function main() {
  //owner is Address0
  const [owner,A1,A2,A3] = await hre.ethers.getSigners();

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();
  await lottery.deployed();

  console.log(
    `The contract address is ${lottery.address} `
  );
  //check the balance of each address  
  const addresses = [owner.address,A1.address,A2.address,A3.address,lottery.address];
  //console.log(printBalance(addresses));
  
  //buy lottery
  
  //await lottery.connect().receive (money)
 
  await A1.sendTransaction
  ({to:lottery.address,
    value: hre.ethers.utils.parseEther("1")});
  await A2.sendTransaction
  ({to:lottery.address,
    value: hre.ethers.utils.parseEther("3")});
  await A3.sendTransaction
  ({to:lottery.address,
    value: hre.ethers.utils.parseEther("5")});
  console.log("Everybody pay their money");
  await printBalance(addresses)

  //pick winner
  console.log("After picking winner");
  await lottery.connect(owner).pick_winner();
  await printBalance(addresses);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
