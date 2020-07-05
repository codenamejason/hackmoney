import { ChainId, Token, TokenAmount, Pair, Trade, TradeType, Route } from '@uniswap/sdk'
const chalk = require('chalk');
const log = console.log;
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
//const { getLegosFor, networks } = require("@studydefi/money-legos");
const legos = require("@studydefi/money-legos");//getLegosFor(networks.ropsten);


const StreamCreatorAbi = [{
        "inputs": [{
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
            },
            {
                "internalType": "address payable",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "_defalultOperators",
                "type": "address[]"
            }
        ],
        "name": "createIncomeStream",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "deadline",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deferment",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isMember",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "member",
        "outputs": [{
            "internalType": "address payable",
            "name": "id",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "operatorData",
        "outputs": [{
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "priceToRegister",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "streamTokenReceiverAddress",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userData",
        "outputs": [{
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

const streamCreatorContractAddress = '0x77Bcf90fFA34e4B0624E8257D58C97a4D3dAB299';


const streamCreatorContract = new web3.eth.Contract(StreamCreatorAbi, streamCreatorContractAddress);
log(chalk.blue('Contract abi loaded...'));



log(streamCreatorContract);

let data = '0x';

let incomeStream = streamCreatorContract.methods.createStream().send({
    from: '0x',
    value: '0x00',
    data: data
});

