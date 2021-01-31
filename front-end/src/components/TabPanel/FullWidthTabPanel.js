import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, FormControl, InputLabel, Select,
          FormHelperText, Input, InputAdornment, Tooltip, Button,
          TextField, NativeSelect, InputBase, MenuItem,
          FormControlLabel, Checkbox } from '@material-ui/core';
import { Grid, Box, Tab, Tabs, AppBar, CircularProgress  } from '@material-ui/core';
import { Table, TableBody, TableCell, TableCounter, TablePagination,
        TableHead, TableRow, TableSortLabel, Backdrop } from '@material-ui/core';
import TransformIcon from '@material-ui/icons/Transform';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Onboard from 'bnc-onboard'
import Notify from 'bnc-notify'
import Web3 from 'web3';
import Portis from '@portis/web3';
import uniswap from "@studydefi/money-legos/uniswap"
import portisUtils from '../../utils/portis.js';
import blockUtils from '../../utils/blockchain.js';
import Main from './Main'
require('dotenv').config();
const ethers = require('ethers');
var Tx = require('ethereumjs-tx');
//let provider = new ethers.getDefaultProvider('ropsten')
const portisDappId = portisUtils.dappId; // -> 'ddefb9bf-de03-4b90-878e-9490166117d0';
const HDWalletProvider = require("truffle-hdwallet-provider");
//const portis = new Portis(portisDappId, 'ropsten', { scope: [ 'email' ], registerPageByDefault: true } );
const chalk = require('chalk');
const log = console.log;
// Ropsten Uniswap Factory: https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351
//const web3 = new Web3(portis.provider);
const { legos } = require("@studydefi/money-legos");
let web3
web3 = new Web3(Web3.givenProvider);// || "http://localhost:8545");// "https://ropsten.infura.io/v3/1ad03ac212da4523b6c8337eace81a14");
//console.log('Account: ', getAccounts());

const factoryAbi = legos.uniswap.factory.abi;
const factoryAddress = legos.uniswap.factory.address;
log(chalk.blue('Factory Address: ', factoryAddress));
const factoryContract = new web3.eth.Contract(factoryAbi, '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'); // Ropsten

// Ropsten DAI Token: https://ropsten.etherscan.io/token/0xaD6D458402F60fD3Bd25163575031ACDce07538D
const DAI_ABI = legos.erc20.dai.abi
const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D'; //'0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
const daiContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);

// Ropsten Uniswap Dai Exchange: https://ropsten.etherscan.io/address/0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0
const EXCHANGE_ABI = legos.uniswap.exchange.abi
const EXCHANGE_ADDRESS = '0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0'; //'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);

// opens the portis widget
//portis.showPortis();

// set the users email if we know if or want to know it...
//portis.setDefaultEmail('satoshi@portis.io');
var userAccount
web3.eth.getAccounts((error, accounts) => {
    //console.log(accounts);
    userAccount = accounts[0]
    //console.log(userAccount)
});

const onboard = Onboard({
    dappId: '8e84cd42-1282-4e65-bcd0-da4f7b6ad7a4',
    networkId: 3,
    darkMode: true,
    subscriptions: {
        wallet: wallet => {
            web3 = new Web3(wallet.provider)
            console.log(`${wallet.name} is now connected!`)
        }
    }
});

const notify = Notify({
    dappId: '8e84cd42-1282-4e65-bcd0-da4f7b6ad7a4',
    networkId: 3,
    darkMode: true,
    system: 'ethereum',
});

// Etherum
//const accounts = await provider.enable()
// register address for all transactions that occur on the user's account

async function connectWallet() {
    await onboard.walletSelect().then((e) => {
        onboard.walletCheck();  
    });      
}

// async function getAccounts () {
//     const accounts = await web3.eth.getAccounts();
//     const address = accounts[0];
//     //const sign = await web3.eth.personal.sign('Connect to Income JAR', userAccount);
//     // web3.eth.sendTransaction({
//     //     from: '0xd2cCea05436bf27aE49B01726075449F815B683e',
//     //     to: '0xBe75fE8c84E90394c0A6B41053DE3689De63FB00',
//     //     value: web3.utils.toWei('0.011', 'ether')
//     // }).on('transactionHash', (hash) => {
//     //     notify.hash(hash);
//     // });
//     console.log(accounts)
//     return accounts;
// }


// BlockNative Notify on account
// Etherum
//const accounts = await provider.enable();
// register address for all transactions that occur on the user's account
//const { emitter } = notify.account(accounts[0])
let ethereum = window.ethereum;
// window.addEventListener('load', async () => {
//     try { await ethereum.enable(); } catch (error) {}
// });
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...

        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;
  
      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
});

let maticAccount 
getWeb3().then((accounts) => {
    console.info(accounts);
    maticAccount = accounts[0];
    console.log(maticAccount);
    const contractInstance = new web3.eth.Contract([
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_payment",
                    "type": "uint256"
                }
            ],
            "name": "createStream",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "sendOwnerStreamTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_streamOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamLength",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamPayment",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamFrequency",
                    "type": "uint256"
                }
            ],
            "name": "StreamCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "_tokensTransferred",
                    "type": "bool"
                }
            ],
            "name": "StreamTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "TokensSent",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferStream",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updateMaxEthPrice",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "updated",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updateMinUEthrice",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "updated",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "WithdrawMade",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "getAll",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "streamId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "streamOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "streamValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "frequency",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "payment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depositAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dateCreated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IncomeStreamCreator.Stream[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllStreams",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalanceContract",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "getStream",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "streamId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "streamOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "streamValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "frequency",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "payment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depositAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dateCreated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IncomeStreamCreator.Stream",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStreamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_totalStreams",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxDepositETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minDepositETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minWaitingPeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "names",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "streamAccounts",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "streamBalances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "streamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "streams",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "streamsArray",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userStreams",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], '0x20d6e498D99EF0Fc72F8CdF4832c5006346a25Ef');
    console.info(contractInstance);
    
    const streamContract = new web3.eth.Contract([
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_payment",
                    "type": "uint256"
                }
            ],
            "name": "createStream",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "sendOwnerStreamTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_streamOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamLength",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamPayment",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamFrequency",
                    "type": "uint256"
                }
            ],
            "name": "StreamCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "_tokensTransferred",
                    "type": "bool"
                }
            ],
            "name": "StreamTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "TokensSent",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferStream",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updateMaxEthPrice",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "updated",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updateMinUEthrice",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "updated",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "WithdrawMade",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "getAll",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "streamId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "streamOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "streamValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "frequency",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "payment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depositAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dateCreated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IncomeStreamCreator.Stream[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllStreams",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalanceContract",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_streamId",
                    "type": "uint256"
                }
            ],
            "name": "getStream",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "streamId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "streamOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "streamValue",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "frequency",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "payment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "depositAmt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dateCreated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IncomeStreamCreator.Stream",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStreamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_totalStreams",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxDepositETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minDepositETH",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minWaitingPeriod",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "names",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "streamAccounts",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "streamBalances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "streamCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "streams",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "streamsArray",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userStreams",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "streamId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "streamOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "streamValue",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "frequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "payment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "dateCreated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], '0x20d6e498D99EF0Fc72F8CdF4832c5006346a25Ef');
    console.info(streamContract);

    streamContract.methods.getAll().call().then((res) => {
        console.log(res);
    });

    

})

const ethOracleAddress = '0x3B6510FE219c9f27663Be9ca50d14dF023a9351F'; // Ropsten
const ethOracleAbi = [{"constant":true,"inputs":[{"name":"_back","type":"uint256"}],"name":"getPreviousTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatestAnswer","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_back","type":"uint256"}],"name":"getPreviousAnswer","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatestTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_aggregator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
let ethPriceContract = new web3.eth.Contract(ethOracleAbi, ethOracleAddress);
//console.log(`Eth price oracle contract ${ethPriceContract}`);

const createStreamAddress = '0xEb3d5b8Fc76fe52B67bc886e53ef48b911904D67';//'0xfc96B1DcBfaff6164fc2335a2Ff2E235E43ceeFB'; //'0x65f71bA5BF4Bfa269151C8BA964AA93c5ED885D5'; //'0x0e43Df5f5B00409831926f761C8Da6bC52E2Ad0f'; Main working..  // '0xcE7AFCE79EEd0CF6c534E1Be5A2D0199D848915D'  //'0x043FA43418C899e5004e1FEf0b4Ba359cdB87299'; // Ropsten
const createStreamAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"_streamOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":false,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"address","name":"_newOwner","type":"address"},{"indexed":false,"internalType":"bool","name":"_tokensTransferred","type":"bool"}],"name":"StreamTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"TokensSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"_user","type":"address"}],"name":"WithdrawMade","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAll","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllStreams","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"getStream","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStreamCount","outputs":[{"internalType":"uint256","name":"_totalStreams","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDepositETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDepositETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_owner","type":"address"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"sendOwnerStreamTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamAccounts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streamBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"streamCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streams","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamsArray","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"},{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updateMaxEthPrice","outputs":[{"internalType":"bool","name":"updated","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updateMinUEthrice","outputs":[{"internalType":"bool","name":"updated","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userStreams","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
//[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":true,"internalType":"address","name":"_streamOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":false,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"address","name":"_newOwner","type":"address"},{"indexed":false,"internalType":"bool","name":"_tokensTransferred","type":"bool"}],"name":"StreamTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"TokensSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"_user","type":"address"}],"name":"WithdrawMade","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAll","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllStreams","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"getStream","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStreamCount","outputs":[{"internalType":"uint256","name":"_totalStreams","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDepositETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDepositETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_owner","type":"address"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"sendOwnerStreamTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamAccounts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streamBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"streamCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streams","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamsArray","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"},{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updateMaxEthPrice","outputs":[{"internalType":"bool","name":"updated","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updateMinUEthrice","outputs":[{"internalType":"bool","name":"updated","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userStreams","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
let createStreamContract = new web3.eth.Contract(createStreamAbi, createStreamAddress);
console.log("Create Stream Contract: ", createStreamContract);

const jarToken777Address = '0xb8BD918c672FDEB005B38Fa9E4B6bB8cECD7b9C9';//'0xb104dBC56f61fAf64BBe8e3E54AFF1337541baC4'; //'0x79E97278e3dF730a18C647c786f7B7350034Dc69';
const jarToken777Abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenHolder",
				"type": "address"
			}
		],
		"name": "AuthorizedOperator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "operatorData",
				"type": "bytes"
			}
		],
		"name": "Burned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "operatorData",
				"type": "bytes"
			}
		],
		"name": "Minted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenHolder",
				"type": "address"
			}
		],
		"name": "RevokedOperator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "operatorData",
				"type": "bytes"
			}
		],
		"name": "Sent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "authorizeOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultOperators",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "granularity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenHolder",
				"type": "address"
			}
		],
		"name": "isOperatorFor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "operatorData",
				"type": "bytes"
			}
		],
		"name": "operatorBurn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "operatorData",
				"type": "bytes"
			}
		],
		"name": "operatorSend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "revokeOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "send",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const jarToken777Contract = new web3.eth.Contract(jarToken777Abi, jarToken777Address);

const jarToken20Address = '0xaa9A41C05299F921C25270Dd0852C0adDb19f473';
const jarToken20Abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_streamOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendStreamTokensToNewStreamOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendTokensToPartner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressBalanceTracker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowanceTracker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "standard",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const jarToken20Contract = new web3.eth.Contract(jarToken20Abi, jarToken20Address);
// JARs -> 0x751859466524E8172e630E22E9Ab58209D075362
const inetTokenAddress = '0x6aaE70B36337360Ee7100e85d5fd23944d33325D';
const inetTokenAbi = [];

const transferContractAddress = '';
const transferContractAbi = [];

// portis.onLogin((walletAddress, email, reputation) => {
//     console.log(walletAddress, email, reputation);
// });
// portis.onLogout(() => {
//     console.log('User logged out');
// });

function print(str) {
    const p = document.createElement("p");
    p.innerText = str;
    document.getElementById("root").appendChild(p);
}

/**
 * TabPanel
 * @param {props} props
 * @param {home} home
 */
function TabPanel(props, home) {
    const { data, children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={5}>
                  <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    table: {
      minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    paper: {
        minWidth: 240,
        marginLeft: '-17px',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function MyStreamsTable(props) {

    const headCells = [
      { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
      { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
      { id: 'deposit', numeric: true, disablePadding: false, label: 'Deposit' },
      { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
      { id: 'noPmts', numeric: true, disablePadding: false, label: 'Duration' },
      { id: 'remainingPmts', numeric: true, disablePadding: false, label: 'Frequency'},
      { id: 'netPresentVal', numeric: true, disablePadding: false, label: 'NPV'}
    ];

    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const [streamId, setStreamId] = useState(0);
    const [streamLength, setStreamLength] = useState(0);
    const [depositAmt, setDepositAmt] = useState(0);
    const [dateCreated, setDateCreated] = useState(0);
    const [streamPmt, setStreamPmt] = useState(0);
    const [streamValue, setStreamValue] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [streamOwner, setstreamOwner] = useState(null);
    const [backdrop, setBackdrop] = useState(false);
    const [stream, setUserStreams] = useState();
    const [selected, setSelected] = React.useState([]);    

    const getStreamsForUser = () => {
        let acct = web3.eth.getAccounts().then(console.log);

        createStreamContract.methods.streams(userAccount).call()
            .then((res, err) => {                
                setBackdrop(true);
                if (err){
                    console.error(err);
                    setBackdrop(false);
                }                
                console.log(res);
                setStreamId(res.streamId);
                setStreamLength(res.duration);
                setDepositAmt(res.depositAmt);
                setDateCreated(res.dateCreated);
                setStreamPmt(res.payment);
                setFrequency(res.frequency);
                setstreamOwner(res.streamOwner);
                setStreamValue(res.streamValue);
                setUserStreams(res);
                setBackdrop(false);
            });
    };

    const getStreamsForUser2 = () => {
        //let acct = web3.eth.getAccounts().then(console.log);

        createStreamContract.methods.streams(userAccount).call()
            .then((res, err) => {                
                setBackdrop(true);
                if (err){
                    console.error(err);
                    setBackdrop(false);
                }                
                console.log(res);
                setStreamId(res.streamId);
                setStreamLength(res.duration);
                setDepositAmt(res.depositAmt);
                setDateCreated(res.dateCreated);
                setStreamPmt(res.payment);
                setFrequency(res.frequency);
                setstreamOwner(res.streamOwner);
                setStreamValue(res.streamValue);
                setUserStreams(res);
                setBackdrop(false);
            });
    };


    return (
        <React.Fragment>
            <br />
            <Button variant="outlined" color="primary" onClick={getStreamsForUser}>Get My Streams</Button>
            <Table>
            <TableHead>
                <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                        ) : null}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">{streamId}</TableCell>
                        <TableCell align="left">{streamOwner}</TableCell>
                        <TableCell align="right">{depositAmt}</TableCell>
                        <TableCell align="right">{streamPmt}</TableCell>
                        <TableCell align="right">{streamLength}</TableCell>
                        <TableCell align="right">{frequency}</TableCell>
                        <TableCell align="right">{web3.utils.fromWei(web3.utils.toBN(streamValue), 'ether')}</TableCell>
                    </TableRow>
                    {/* {stream.map((item) => {
                        return (
                            <TableRow>
                                <TableCell>item.streamId</TableCell>
                            </TableRow>
                        );
                    })} */}
                                
                </TableBody>
            </Table>
            
        </React.Fragment>
    );
}

function MyStreamsTableWithCheckbox(props) {
    const classes = useStyles();
    const headCells = [
        { id: 'isChecked', numeric: false, disablePadding: false, label: 'Selected' },
        { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
        { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
        { id: 'deposit', numeric: true, disablePadding: false, label: 'Deposit' },
        { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
        { id: 'noPmts', numeric: true, disablePadding: false, label: 'Duration' },
        { id: 'remainingPmts', numeric: true, disablePadding: false, label: 'Frequency'},
        { id: 'netPresentVal', numeric: true, disablePadding: false, label: 'NPV'}
    ];

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const [stream, setStream] = useState({});
    const [streams, setStreams] = useState([]);
    const [streamId, setStreamId] = useState(0);
    const [streamLength, setStreamLength] = useState(0);
    const [depositAmt, setDepositAmt] = useState(0);
    const [dateCreated, setDateCreated] = useState(0);
    const [streamPmt, setStreamPmt] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [streamValue, setStreamValue] = useState(0);
    const [streamOwner, setstreamOwner] = useState(null);
    const [backdrop, setBackdrop] = useState(false);
    const [selected, setSelected] = React.useState([]);    
    const [streamChecked, setStreamChecked] = React.useState(false);

    const handleCheckedChange = (event) => {
      setStreamChecked(event.target.checked);
      setSelected(event.target.value)
    };

    const getStreamsForUser = () => {
        let acct = web3.eth.getAccounts().then(console.log);

        createStreamContract.methods.streams(userAccount).call()
            .then((res, err) => {                
                setBackdrop(true);
                if (err){
                    console.error(err);
                    setBackdrop(false);
                }                
                console.log(res);
                setStreamId(res.streamId);
                setStreamLength(res.duration);
                setDepositAmt(res.depositAmt);
                setDateCreated(res.dateCreated);
                setStreamPmt(res.payment);
                setFrequency(res.frequency);
                setstreamOwner(res.streamOwner);
                setStreamValue(res.streamValue);                
                setStream(res);
                setBackdrop(false);
            });
            
        createStreamContract.methods.getAll().call()
            .then((res, err) => {
                if (err){
                    console.error(err);
                    setBackdrop(false);
                }                
                console.log(res);
                setStreams(res)
            })

        // createStreamContract.methods.getAllStreams().call()
        //     .then((res, err) => {
        //         if (err){
        //             console.error(err);
        //             setBackdrop(false);
        //         }                
        //         console.log(res);
        //     })

        createStreamContract.methods.getBalanceContract().call()
            .then((res, err) => {
                console.info(res)
            })
    };    

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={getStreamsForUser}>Get My Streams</Button>
            {/* <Grid container spacing={3} style={{ paddingLeft: '15px'}} >
                <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ padding: '10px'}} >
                        <Grid container spacing={3}>
                            <Grid item xs={6} style={{ marginTop: '10px'}} >
                                <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                                    <Checkbox 
                                        checked={checked}
                                        onChange={handleCheckedChange}
                                        inputProps={{ 'aria-label': 'selected-stream' }}
                                        color="secondary"
                                        size="medium"
                                    />
                                    <Typography variant='h6' >Id:</Typography>    
                                </FormControl>                                                    
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    defaultValue={streamId} 
                                    disabled
                                    variant='outlined'
                                    width='50'
                                />
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                <Typography variant='h6' >Owner: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    defaultValue={streamOwner} 
                                    disabled
                                    variant='outlined'
                                    width='50'
                                />
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                <Typography variant='h6' >Deposit Amount USD: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    defaultValue={depositAmt} 
                                    disabled
                                    variant='outlined'
                                    width='50'
                                />
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                <Typography variant='h6' >Payment Amount JAR: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    defaultValue={streamPmt} 
                                    disabled
                                    variant='outlined'
                                    width='50'
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>                
            </Grid> */}
            <Table>
            <TableHead>
                <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                        ) : null}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">
                            <Checkbox 
                                checked={streamChecked}
                                onChange={handleCheckedChange}
                                inputProps={{ 'aria-label': 'selected-stream' }}
                                color="secondary"
                                size="medium"
                            />
                        </TableCell>
                        <TableCell align="left">{streamId}</TableCell>
                        <TableCell align="left">{streamOwner}</TableCell>
                        <TableCell align="right">{depositAmt}</TableCell>
                        <TableCell align="right">{streamPmt}</TableCell>
                        <TableCell align="right">{streamLength}</TableCell>
                        <TableCell align="right">{frequency}</TableCell>
                        <TableCell align="right">{web3.utils.fromWei(web3.utils.toBN(streamValue), 'ether')}</TableCell>
                    </TableRow>                    
                </TableBody>
            </Table>
        </React.Fragment>
    );
}


/**
 * My Streams
 * @param {object} data
 */
const MyStreams = ({data, account}) => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        ownerAddress: '',
        newOperator: '',
        stream: {
          id: 0,
        },
    });
   
    return(
        <React.Fragment>
            <Grid item xs={12}>
              <Paper className={classes.paperHeading} elevation={3}>

              </Paper>
              <Paper className={classes.paper} elevation={6}>
                  <MyStreamsTable account={account} />                    
                </Paper>
              </Grid>
        </React.Fragment>
    );
}

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

/**
 * Transfer stream form
 * @param {object} param0
 */
const TransferStreamForm = ({ props, account }) => {
    const classes = useStyles();
    const [backdrop, setBackdrop] = useState(false);
    //const [account, setAccount] = useState(null);
    const [stream, setUserStreams] = useState();
    const [streams, updateStreams] = useState([]);
    const [streamId, setStreamId] = useState(0);
    const [streamLength, setStreamLength] = useState(0);
    const [depositAmt, setDepositAmt] = useState(0);
    const [dateCreated, setDateCreated] = useState(0);
    const [streamPmt, setStreamPmt] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [streamOwner, setstreamOwner] = useState(null);
    const [newOwner, setNewOwner] = useState(null);
    const [formValues, setFormValues] = useState({
        ownerAddress: account, //'0xdDA0E4835D997518C7C4a6b479dA4e3F24Aa84da',
        newOperator: '',
        stream: {
          id: streamId,
        },
    });

   
    const handleAddressChange = (prop) => (event) => {

    }

    const handleStreamChange = (props) => (event) => {

    }

    const handleFormSubmit = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
        props.setValue(3)
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
              <Paper className={classes.paperHeading} elevation={3}></Paper>
              <Paper className={classes.paper} elevation={3}>                    
                    <div><br/></div>
                    <MyStreamsTableWithCheckbox account={account} />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <FormControl className={classes.formControl} style={{ minWidth: 420 }}>
                                <InputLabel htmlFor="new-owner-textbox">New Owner</InputLabel>
                                <Tooltip title='Who do you want to send to' placement='top-start'>
                                <BootstrapInput
                                        id="new-owner-textbox"
                                        value={newOwner}
                                        variant="outlined"
                                        color='primary'                                        
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                /></Tooltip>
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    New Owner
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs><br />
                            <Tooltip title='coming soon'>
                                <Button
                                    variant='contained'
                                    size='large'
                                    color='primary'
                                    onClick={handleFormSubmit}
                                    startIcon={<TransformIcon />}
                                >
                                  Transfer Now
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <br />
                </Paper>
              </Grid>
        </React.Fragment>
    )
}

const CreateStreamForm = ({ data, setValue, account }) => {
    // let accounts = web3.eth.getAccounts();
    // console.log('Account: ', accounts[0]);
    
    const classes = useStyles();
    const [ethPrice, setEthPrice] = useState(0)
    const [open, setOpen] = React.useState(false);
    const [duration, setDuration] = useState(0);
    const [productType, setProductType] = useState('IMMEDIATE');
    const [amount, setAmount] = useState(0);
    const [deferredDuration, setDeferredDuration] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [payment, setPayment] = useState(0);
    const [depositType, setDepositType] = useState('ETH');
    const [amountConverted, setAmountConverted] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [currentEthPrice, setCurrentEthPrice] = useState(0);
    const [backdrop, setBackdrop] = useState(false)
    const [formValues, setFormValues] = useState({
        productType: '',
        duration: '',
        deferredDuration: '',
        frequency: '',
        amount: '',
        payment: '',
    });

    const paymentTotal = payment * duration * frequency;
    const minimum = 100;
    const maximum = 100000;
    const roundUp = (number, precision) => {
        precision = Math.pow(10, precision);
        return Math.ceil(number * precision) / precision;
    }

    // Minimum tokens to swap
    const MIN_TOKENS = 1
    //log(chalk.greenBright("Min Tokens to receive: ", MIN_TOKENS))

    // Set Deadline 1 minute from now
    const moment = require('moment') // import moment.js library
    const now = moment().unix() // fetch current unix timestamp
    const DEADLINE = now + 60 // add 60 seconds
    //console.log("Deadline", DEADLINE)

    // Transaction Settings
    const SETTINGS = {
        gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
        gasPrice: web3.utils.toWei('50', 'Gwei'),
        from: userAccount,
        value: web3.utils.toWei('0.001', 'Ether') // Amount of Ether to Swap
    }
    // const SETTINGS2 = {
    //     gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
    //     gasPrice: web3.utils.toWei('50', 'Gwei'),
    //     from: '0xd2cCea05436bf27aE49B01726075449F815B683e', // Use your account here
    //     value: web3.utils.toWei('0.01', 'Ether') // Amount of Ether to Swap
    // }
    //console.log("Settings", SETTINGS)
    let tokensToSend = (roundUp(payment.toFixed(0), 2) * frequency * duration) + '000000000000000000';
    
    async function swapEthForDai(callback) {
        try {
            let balance
        
            // Check Ether balance BEFORE swap
            balance = await web3.eth.getBalance(SETTINGS.from)
            balance = web3.utils.fromWei(balance, 'Ether')
            //console.log("Ether Balance Before Tx:", balance)
        
            // Check Dai balance BEFORE swap
            balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
            balance = web3.utils.fromWei(balance, 'Ether')
            //log(chalk.yellow("Dai Balance Before Tx:", balance))
        
            // Perform Swap
            //console.log('Performing swap...')
            let result
            result = await exchangeContract.methods.ethToTokenSwapInput(MIN_TOKENS, DEADLINE).send(SETTINGS)
            //log(chalk`Successful Swap: {bold.hex('#2AD8D8') https://ropsten.etherscan.io/tx/${result.transactionHash}}`)
        
            // Check Ether balance AFTER swap
            balance = await web3.eth.getBalance(SETTINGS.from)
            balance = web3.utils.fromWei(balance, 'Ether')
            //console.log("Ether Balance After Swap:", balance)
        
            // Check Dai balance AFTER swap
            balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
            balance = web3.utils.fromWei(balance, 'Ether')
            //log(chalk.yellow("Dai Balance After Swap:", balance))
      
        }
        catch(error) {
            console.log(error)
        }
      
        //callback()
    }

    // Call the contract on-chain and create the new stream
    async function createStreamWithContract() {
        var count = await web3.eth.getTransactionCount(userAccount);
        console.log(`Number of tx so far: ${count}`);
        // get the eth amount from form in wei
        const amountInEth = amountConverted.toString();
        console.log('Amount in Ether: ', amountInEth);
        console.log('Payment: ',  roundUp(payment.toFixed(0), 2));
        const jar = (roundUp(payment.toFixed(0), 2) * frequency * duration);

        //swapEthForDai();
        // Create the income stream
        await createStreamContract.methods.createStream(amount, duration, frequency, roundUp(payment.toFixed(0), 2))
            .send({ from: userAccount, gas: 8000000, value: web3.utils.toWei(amountInEth) })           
            .then((error, result) => {                
                setBackdrop(true);
                if(error){
                    console.error(error);
                    setBackdrop(false)
                }
                console.log(result);
                // Send the new stream owner their tokens
                sendTokensToNewStreamOwner();
                console.log(`sent ${jar} tokens to ${userAccount} for their stream.`)
        });

        setOpen(false); // close the modal
        setBackdrop(false)
        // navigate to the streams tab
        setValue(2);
    }

    async function sendTokensToNewStreamOwner() {
        var privateKey = '34F25DD9CCBA9EF55E296BD0139C7CA75CDC8AA3E9DC8758D082C204AB5BC3A6';// enjoy pk, you already stole my real shit!
        // process.env.PRIVATE_KEY; this one has already been hacked
        console.log(privateKey)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const wallet = new ethers.Wallet(
            privateKey, // Default private key for ganache-cli -d
            provider
        );        
        const tokenContract = new ethers.Contract(jarToken20Address, jarToken20Abi, wallet);
        const jar = (roundUp(payment.toFixed(0), 2) * frequency * duration);
        console.log(`Sending new stream owner ${jar} tokens at ${userAccount}`)
        var tx = tokenContract.sendStreamTokensToNewStreamOwner(userAccount,  tokensToSend);
        tx.then((tx) => {
            const { emitter } = notify.hash(tx.hash);
            console.log(tx);
        })
    }    


    function insertDecimal(number) {
        return (number / 100000000).toFixed(4);
    }

    let priceOfEth = 0;
    // Price Feed for Eth
    (async function getEthPrice() {
        await ethPriceContract.methods.getLatestAnswer().call()
        .then((res) => setCurrentEthPrice(res));
            var ethPrice2 = insertDecimal(currentEthPrice);
            console.log('Price Of ETH', ethPrice2);
            setEthPrice(insertDecimal(currentEthPrice))
            setAmountConverted(((Number(amount)) / ethPrice2));
            console.log(`Amount converted ${amountConverted}`)
            console.log(`Current Eth price: ${priceOfEth}`);
    })(setTimeout(10000));

    // ToDo: Price Feed for Dai

    const handleOpen = (event, value) =>{
        setOpen(true);
        console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`)
        console.log(`Payment Total: ${paymentTotal}`);        
    };

    const handleClose = () => {
        setOpen(false);
        // anythin else we want to do here??
    };

    const getInterestRate = (duration) => {
        
    }

    const handleFrequencyChange = (event, newValue) => {
        const frequency = event.target.value;
        setFrequency(frequency);
        console.log(frequency);
        // need to refresh the rest ...
        let pmt = (amount / duration) / frequency;
        let interest
        if(duration == 1){
            interest = pmt * .0675; // 6.75% PA
        } else if(duration == 3){
            interest = pmt * .2861; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .6662; // 10.75% PA
        }
        
        pmt = pmt + interest;

        setPayment(pmt);
        setTotalPayments(frequency * payment * duration);
    };

    const handlePaymentChange = (event, newValue) => {
      const payment = event.target.value;
      setPayment(payment);
      //setTotalPayments(payment * frequency * duration);

    };

    const handleAmountChange = (event, newValue) => {
        const amount = event.target.value;
        
        let pmt = (amount / duration) / frequency;
        let interest
        if(duration == 1){
            interest = pmt * .0675; // 6.75% PA
        } else if(duration == 3){
            interest = pmt * .2861; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .6662; // 10.75% PA
        }
        
        pmt = pmt + interest;
        setPayment(pmt);

        switch (frequency) {
          case 1:
              // if one payment the duration has to be 3 years
              //setDuration(36)
              setTotalPayments(pmt * 1);

              break;

          case 4:
              // quarterly payments
              setTotalPayments(pmt * 4);
              break;

          case 12:
              // monthly payments
              setTotalPayments(pmt * 12);
              break;

          default:
              // default shit here
              setTotalPayments(pmt * 1);
              break;
        }
        setAmount(amount);
        console.log(amount);
    };

    const handleDepositChange = (event, newValue) => {
        const depositType = event.target.value;
        setDepositType(depositType);
        // now we need to make sure we do any conversions in the background..

        // display the amount of slected deposit value is USD/<selected>
        //currentEthPrice

        //setTotalPayments(payment * frequency * duration);
    };

    const handleDurationChange = (event, newValue) => {
        const duration = event.target.value;
        setDuration(duration);
        console.log(duration);
        let pmt = (amount / duration) / frequency;
        let interest
        if(duration == 1){
            interest = pmt * .0675; // 6.75% PA
        } else if(duration == 3){
            interest = pmt * .2861; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .6662; // 10.75% PA
        }
        
        pmt = pmt + interest;
        setPayment(pmt);
        setTotalPayments(payment * frequency * duration);
    };

    /**
     * @dev Only using Immediate right now
     * @param {*} event 
     * @param {*} newValue 
     */
    const handleProductTypeChange = (event, newValue) => {
        const product = event.target.value;
        setProductType(product)
        console.log(product)
    };

    /**
     * @dev Not using yet
     * @param {*} event 
     * @param {*} newValue 
     */
    const handleDeferredDurationChange = (event, newValue) => {
        const deferredDuration = event.target.value;
        setDeferredDuration(deferredDuration)
        console.log(deferredDuration)
        // uses new interest chart for deferements
        //setTotalPayments(payment * frequency * duration);
    };

    /**
     * @dev Create Income Stream click event..
     * @todo: modal confirmation
     * 
     * @param {form values} prop 
     */
    // const createIncomeStream = (prop) => (event) => {
    //     console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`);
    //     // set the form values in one object
    //     setFormValues({ ...formValues, [prop]: event.target.value });
    // };

    const confirmCreateStream = (prop) => (event) => {
        console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`)
        setFormValues({ ...formValues, [prop]: event.target.value });

    }

    /**
     * @todo Future Use
     * @dev This will set the deferement value
     */
    let deferredTime
    if(productType == 'DEFERRED'){
        deferredTime =  <React.Fragment>
                            <FormControl>
                                <InputLabel htmlFor="deferredDuration" style={{ color: '#009be5' }}>
                                    Deferred Duration in Years
                                </InputLabel>
                                <Select
                                    style={{ color: '#009be5' }}
                                    native
                                    value={deferredDuration}
                                    onChange={handleDeferredDurationChange}
                                    inputProps={{
                                        name: 'deferredDuration',
                                        id: 'deferredDuration',
                                    }}
                                >
                                    <option aria-label="None" value="Select Duration" />
                                    <option value={1}>One</option>
                                    <option value={3}>Three</option>
                                    <option value={5}>Five</option>
                                </Select>
                                <FormHelperText style={{ color: '#FE6B8B' }}>helper text</FormHelperText>
                            </FormControl>
                        </React.Fragment>
    };

    function createData(duration, frequency, amount) {
      return { duration, frequency, amount };
    }

    const stream = [
      createData(duration, frequency, amount)
    ];

    // createStreamWithContract
    return (
        <React.Fragment>
            <Modal
                  aria-labelledby="create-stream-confirmation"
                  aria-describedby="create stream confirmation"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
              >
                  <Fade in={open}>
                      <div className={classes.paper} style={{ padding: '20px'}}>
                          <h2 id="create-stream-confirmation">Please Confirm Your Selection</h2>
                          <div>
                                <Grid container spacing={3} style={{ paddingLeft: '15px'}} >
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper} style={{ padding: '10px'}} >
                                            <Grid container spacing={3}>
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >
                                                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                                                        <Typography variant='h6' >Duration of Stream: </Typography>    
                                                    </FormControl>                                                    
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={stream[0].duration} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                                    <Typography variant='h6' >Number of Payments: </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={stream[0].frequency} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                                    <Typography variant='h6' >Deposit Amount USD: </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={stream[0].amount} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>                                                
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                                    <Typography variant='h6' >ETH Cost of Stream: </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={amountConverted} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                                    <Typography variant='h6' >Scheduled Payment JAR: </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={payment.toFixed(0)} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{ marginTop: '10px'}} >                                                    
                                                    <Typography variant='h6' >Total Payments JAR: </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField 
                                                        defaultValue={paymentTotal.toFixed(0)} 
                                                        disabled
                                                        variant='outlined'
                                                        width='50'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    
                                </Grid>
                                <br /> 
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={createStreamWithContract}
                                >
                                    Create My Stream
                                </Button>&nbsp;
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                          </div>
                      </div>
                  </Fade>
              </Modal>
                
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={3}>
                    <Grid item xs>
                        ETH/USD: {ethPrice}
                    </Grid>
                    <Grid item xs>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                        {/* <InputLabel htmlFor="amountConverted" style={{ color: '#009be5' }}>
                            Amount in [selecected] currency
                        </InputLabel> */}
                        <Tooltip title='Amount of your deposit' placement='top-start'>
                        <BootstrapInput
                                id="amountConverted"
                                value={amountConverted}
                                variant="outlined"
                                color='primary'
                                disabled
                                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        /></Tooltip>
                        <FormHelperText style={{ color: '#FE6B8B' }}>
                            Amount in {depositType}
                        </FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                        {/* <InputLabel htmlFor="totalPayments" style={{ color: '#009be5' }}>
                            Total Payments.
                        </InputLabel> */}
                        <Tooltip title='Total amount you will receive' placement='top-start'>
                        <BootstrapInput
                                id="totalPayments"
                                value={paymentTotal == null ? 0 : paymentTotal.toFixed(0)}
                                variant="outlined"
                                color='primary'
                                disabled
                            /></Tooltip>
                        <FormHelperText style={{ color: '#FE6B8B' }}>
                            Total Amount You Will Receive
                        </FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                    <Tooltip title='Your payment amount' placement='top-start'>                     
                        <BootstrapInput
                            id="payment"
                            value={payment == null ? 0 : payment.toFixed(0)}
                            variant="outlined"
                            color='primary'
                            disabled
                        /></Tooltip>
                        <FormHelperText style={{ color: '#FE6B8B' }}>
                            Your Payment Amount
                        </FormHelperText>
                    </FormControl>
                    </Grid>
                </Paper>
                <br />
                <Paper className={classes.paper} elevation={6}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                            <InputLabel htmlFor="duration" style={{ color: '#009be5' }}>
                                Duration in Years
                            </InputLabel>
                            <Tooltip title='Length of time to receive payments' placement='top-start'>
                            <NativeSelect
                                id="duration"
                                value={duration}
                                onChange={handleDurationChange}
                                input={<BootstrapInput />}
                            >
                            <option aria-label="None" value="" />
                            <option value={1}>One</option>
                            <option value={3}>Three</option>
                            <option value={5}>Five</option>
                            {/* <option value={7}>Seven</option>
                            <option value={10}>Ten</option> */}
                            </NativeSelect>
                            </Tooltip>
                            <FormHelperText style={{ color: '#FE6B8B' }}>
                                How long do you want to be paid in years?
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                        <InputLabel htmlFor="frequency" style={{ color: '#009be5' }}>Frequency</InputLabel>
                        <Tooltip title='how often do you want paid' placement='top-start'>
                        <NativeSelect
                            id="frequency"
                            value={frequency}
                            onChange={handleFrequencyChange}
                            input={<BootstrapInput />}
                            >
                            <option aria-label="None" value="" />
                            <option value={'12'}>Monthly</option>
                            <option value={'4'}>Quarterly</option>
                            <option value={'1'}>Yearly</option>
                        </NativeSelect>
                        </Tooltip>
                            <FormHelperText style={{ color: '#FE6B8B' }}>
                                How often do you want your payments?
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                        <InputLabel htmlFor="depositType" style={{ color: '#009be5' }}>Deposit Type</InputLabel>
                        <Tooltip title='select your deposit type' placement='top-start'>
                            <NativeSelect
                            id="depositType"
                            value={depositType}
                            onChange={(e) => handleDepositChange(e)}
                            input={<BootstrapInput />}
                            >
                            <option aria-label="None" value="" />
                            <option value={'ETH'}>ETH</option>
                            {/*<option value={'DAI'}>DAI</option>
                             <option value={'USDC'}>USDC</option>
                            <option value={'BUSD'}>BUSD</option>
                            <option value={'TUSD'}>TUSD</option> */}
                            </NativeSelect></Tooltip>
                            <FormHelperText style={{ color: '#FE6B8B' }}>
                                Select your currency / token
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <div><br/></div>                   
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                            <InputLabel htmlFor="amount" style={{ color: '#009be5' }}>
                                    Amount in USD
                            </InputLabel>
                            <Tooltip title='Amount to deposit' placement='right'>
                            <BootstrapInput  InputLabelProps={{ shrink: true }} 
                                id="amount"
                                value={amount}
                                variant="outlined"
                                onChange={handleAmountChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            </Tooltip>
                            <FormHelperText style={{ color: '#FE6B8B' }}>
                                Enter amount you wish to contribute
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                       <Typography><br />
                           Maximum deposit is $1000<br />
                           Minimum deposit is $100
                       </Typography>

                    </Grid>
                    <Grid item xs><br />
                        <FormControl  style={{ minWidth: 200 }}>
                            <Tooltip title='Create the Stream' placement='left'>
                                <Button
                                    variant='contained'
                                    size='large'
                                    color='primary'
                                    onClick={handleOpen}
                                    startIcon={<BlurLinearIcon />}
                                >Create</Button>
                            </Tooltip>
                        </FormControl>
                    </Grid>
                    </Grid>                     
                </Paper>
            </Grid>
        </React.Fragment>
    );

}

const TokenExchange = ({data, account }) => {

    async function exchangeJarForDai() {
        var privateKey = '34F25DD9CCBA9EF55E296BD0139C7CA75CDC8AA3E9DC8758D082C204AB5BC3A6';// enjoy pk, you already stole my real shit!
        // process.env.PRIVATE_KEY;
        console.log(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const wallet = new ethers.Wallet(
            privateKey, // Default private key for ganache-cli -d
            provider
        );        
        const tokenContract = new ethers.Contract(jarToken777Address, jarToken20Abi, wallet);
        //const jar = (roundUp(payment.toFixed(0), 2) * frequency * duration);
        console.log(`Sending new stream owner 1 tokens at ${userAccount}`)
        var tx = tokenContract.sendStreamTokensToNewStreamOwner(userAccount,  1);
        tx.then((tx) => {
            const { emitter } = notify.hash(tx.hash);
            console.log(tx);
        })
    }   

    return (
        <Fragment>
                <Typography justifyContent='center'>Redeem JAR Here</Typography>
            <Main />            
        </Fragment>
    )
}

/**
 * Full width tabs
 */
function FullWidthTabs() {


    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Create Stream" {...a11yProps(0)} />
            <Tab label="Transfer Stream" {...a11yProps(1)} />
            <Tab label="My Stream(s)" {...a11yProps(2)} />
            <Tab label="Redeem JAR Tokens" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
             <CreateStreamForm setValue={setValue} account={userAccount} />
          </TabPanel>
          <TabPanel value={value} index={1}>
              <TransferStreamForm setValue={setValue}/>
          </TabPanel>
          <TabPanel value={value} index={2} >
              <MyStreams account={userAccount} />
          </TabPanel>
          <TabPanel value={value} index={3} >
              <TokenExchange account={userAccount} />
          </TabPanel>
        </SwipeableViews>
      </div>
    );
}

export default FullWidthTabs;