const chalk = require('chalk');
const log = console.log;

/**
 * @dev Uniswap Section
 */
//import uniswap from "@studydefi/money-legos/uniswap"
const { legos } = require("@studydefi/money-legos");

const factoryAbi = legos.uniswap.factory.abi;
const factoryAddress = legos.uniswap.factory.address;
log(chalk.blue('Factory Address: ', factoryAddress))

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
log(chalk.greenBright("Min Tokens to receive: ", MIN_TOKENS))

// Set Deadline 1 minute from now
const moment = require('moment') // import moment.js library
const now = moment().unix() // fetch current unix timestamp
const DEADLINE = now + 60 // add 60 seconds
console.log("Deadline", DEADLINE)


/**
 * @dev Aave Section
 */




 
/*
 *   @dev Transaction Settings
 */
const SETTINGS = {
    gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
    gasPrice: web3.utils.toWei('50', 'Gwei'),
    from: '0x783ABd013a6D41334BCa711CDE577A5211487883', // Use your account here
    value: web3.utils.toWei('0.01', 'Ether') // Amount of Ether to Swap
}
console.log("Settings", SETTINGS)