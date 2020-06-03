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


const createStreamAddress = '0xa3C5DD1Bfc094869c7b32974834f5E14aE532Cd1';
const createStreamAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_streamOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"inputs":[],"name":"MEMBER_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceToRegister","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receive","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"streamOwner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"userData","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}];

let createStreamContract = new web3.eth.Contract(createStreamAbi, createStreamAddress);
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


export default FullWidthTabs;