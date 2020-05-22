import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
// material-ui
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, FormControl, InputLabel, Select,
          FormHelperText, Input, InputAdornment, Tooltip, Button,
          TextField, NativeSelect, InputBase, MenuItem,
          FormControlLabel} from '@material-ui/core';
import { Grid, Box, Tab, Tabs, AppBar } from '@material-ui/core';
import { Table, TableBody, TableCell, TableCounter, TablePagination,
        TableHead, TableRow, TableSortLabel } from '@material-ui/core';
// icons
import AddIcon from '@material-ui/icons/Add';
import TransformIcon from '@material-ui/icons/Transform';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import FullWidthTabs from './FullWidthTabPanel';
// blockchain etc.
import Web3 from 'web3';
var web3 = new Web3(Web3.givenProvider || "127.0.0.1:8545");

const streamTokenAddress = '0x4ec3e41ce1c658ae7e011de309a87184405f60fd';
const streamTokenAbi = [
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

const createStreamAddress = '0x36Da2253Ee9c1e727A53a18bba02E2D3994Cb9AD';
const createStreamAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_streamOwnerId","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"source","type":"string"}],"name":"Test","type":"event"},{"inputs":[],"name":"MEMBER_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"payStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"priceToRegister","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"}];

let createStreamContract = new web3.eth.Contract(createStreamAbi, createStreamAddress);
let streamTokenContract = new web3.eth.Contract(streamTokenAbi, streamTokenAddress);
console.log('Token Contract: ', streamTokenContract)
console.log("Create Stream Contract: ", createStreamContract);

//const web3 = new Web3(window.ethereum);

async function runSetup() {
    console.group('Run Setup:')
    // Detect MetaMask
    if(typeof web3 !== 'undefined') {
      // continue execution
      console.log('Welcome!')
      //await loadBlockchainData()

      // test account
      //const account = "0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533";

      const web3 = await loadWeb3()
      //const account = await loadAccount(web3)
      const account = await web3.eth.getAccounts()
      console.log(account)
      //this.checkAuthorization(account)
    } else {
      console.log('User does not have MetaMask installed')
      window.alert('Please install MetaMask!')
      // todo: don't show page content here...

    }
    console.groupEnd()
}

async function loadWeb3() {
    console.group('Web3');
    console.info('Loading Web3');
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.groupEnd();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.groupEnd();
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      console.groupEnd();
    }
}

async function checkAuthorization(account){
    // ToTo: check against actual token holders
    // Call a smart contract to fetch token holders
    // Test accounts from Ganache
    const tokenHolders = [
      "0xb6498080D032a5cede8d03feA95b693596b87580"
    ]

    const authorized = tokenHolders.includes(account)
    if(authorized) {
      // todo: show website content
      //window.alert("You're Authorized! :)")
      console.log("You're Authorized! :)")
    } else {
      // todo: show login content
      window.alert("You're not Authorized! :(")
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        flexGrow: 1,
    },
    table: {
      minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: '10px',
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


// // test for ui testing
// const streams = [
//   {
//       streamId: '0x0000000000000000000000000000',
//       owner: '0x0000000000000000000000000000',
//       payment: 879.17,
//       deposit: 10000,
//       numberOfPayments: 12
//   },
//   {
//       streamId: '0x0000000000000000000000000000',
//       owner: '0x0000000000000000000000000000',
//       payment: 293.06,
//       deposit: 10000,
//       numberOfPayments: 36
//   },
//   {
//       streamId: '0x0000000000000000000000000000',
//       owner: '0x0000000000000000000000000000',
//       payment: 175.83,
//       deposit: 10000,
//       numberOfPayments: 60
//   }
// ]

const Operators = ({operatorData, userData}) => {
    const classes = useStyles();

    return (
      <React.Fragment>
        <Paper elevation={3}>

        </Paper>
      </React.Fragment>
    )
}


export default FullWidthTabs;