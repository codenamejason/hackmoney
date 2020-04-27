// Ropsten Uniswap Factory: https://ropsten.etherscan.io/address/0x9c83dce8ca20e9aaf9d3efc003b2ea62abc08351
//import uniswap from "@studydefi/money-legos/uniswap"
const { legos } = require("@studyDefi/money-legos");

const factoryAbi = legos.uniswap.factory.abi;
const factoryAddress = legos.uniswap.factory.address;
console.log(factoryAbi, ' ', factoryAddress)

// Ropsten DAI Token: https://ropsten.etherscan.io/token/0xaD6D458402F60fD3Bd25163575031ACDce07538D
const DAI_ABI = legos.erc20.dai.abi
const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D'
const daiContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);

// erc20 tokens
legos.erc20.abi;
legos.erc20.address;

// Ropsten Uniswap Dai Exchange: https://ropsten.etherscan.io/address/0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0
const EXCHANGE_ABI = legos.uniswap.exchange.abi
const EXCHANGE_ADDRESS = '0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0'
const exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);



// Minimum tokens to swap
const MIN_TOKENS = 1
console.log("Min Tokens", MIN_TOKENS)

// Set Deadline 1 minute from now
const moment = require('moment') // import moment.js library
const now = moment().unix() // fetch current unix timestamp
const DEADLINE = now + 60 // add 60 seconds
console.log("Deadline", DEADLINE)

// Transaction Settings
const SETTINGS = {
    gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
    gasPrice: web3.utils.toWei('50', 'Gwei'),
    from: '0x79e852C6e4626386dDB36b5f8dE16Bf0efAb800A', // Use your account here
    value: web3.utils.toWei('1', 'Ether') // Amount of Ether to Swap
}
console.log("Settings", SETTINGS)

module.exports = async function(callback) {
  try {
    let balance

    // Check Ether balance BEFORE swap
    balance = await web3.eth.getBalance(SETTINGS.from)
    balance = web3.utils.fromWei(balance, 'Ether')
    console.log("Ether Balance Before Tx:", balance)

    // Check Dai balance BEFORE swap
    balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
    balance = web3.utils.fromWei(balance, 'Ether')
    console.log("Dai Balance Before Tx:", balance)

    // Perform Swap
    console.log('Performing swap...')
    let result
    result = await exchangeContract.methods.ethToTokenSwapInput(MIN_TOKENS, DEADLINE).send(SETTINGS)
    console.log(`Successful Swap: https://ropsten.etherscan.io/tx/${result.transactionHash}`)

    // Check Ether balance AFTER swap
    balance = await web3.eth.getBalance(SETTINGS.from)
    balance = web3.utils.fromWei(balance, 'Ether')
    console.log("Ether Balance After Swap:", balance)

    // Check Dai balance AFTER swap
    balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
    balance = web3.utils.fromWei(balance, 'Ether')
    console.log("Dai Balance After Swap:", balance)

  }
  catch(error) {
    console.log(error)
  }

  callback()
}
