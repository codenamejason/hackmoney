const chalk = require('chalk');
const log = console.log;
const ethers = require('ethers');
/**
 * @dev Uniswap Section
 */
//import uniswap from "@studydefi/money-legos/uniswap"
const { legos } = require("@studydefi/money-legos");

// You don't need truffle artifacts as long as you have a way to retrieve
// the address and abi of the deployed contract nicely
const FlashLoan = require("../src/abis/FlashLoan.json");

console.log('Starting flashloan...')
const flashLoanAddress =  FlashLoan.address;

const contractWithFlashLoan = new ethers.Contract(
    flashLoanAddress,
    FlashLoan.abi
);

const main = async () => {
  // Encoding our custom data
  const myCustomDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint"],
    ["0x0000000000000000000000000000000000000000", 42]
  );

  const tx = await contractWithFlashLoan.flashLoan(
    legos.erc20.dai.address//, // We would like to loan DAI
    //ethers.utils.parseEther("1"), // We would like to loan 1 DAI in 18 decimals
    //myCustomDataEncoded, // _params encoded
    //{
    //  gasLimit: 4000000,
    //}
  );
  await tx.wait();
};

main();