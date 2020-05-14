const { web3 } = require("@openzeppelin/test-helpers/src/setup");

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
const streamCreatorContractAddress = '0x77bcf90ffa34e4b0624e8257d58c97a4d3dab299';

const streamCreatorContract = new web3.eth.Contract(StreamCreatorAbi, streamCreatorContractAddress);

console.log(streamCreatorContract);


