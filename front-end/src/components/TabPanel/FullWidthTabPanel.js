import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, FormControl, InputLabel, Select,
          FormHelperText, Input, InputAdornment, Tooltip, Button,
          TextField, NativeSelect, InputBase, MenuItem,
          FormControlLabel} from '@material-ui/core';
import { Grid, Box, Tab, Tabs, AppBar, CircularProgress  } from '@material-ui/core';
import { Table, TableBody, TableCell, TableCounter, TablePagination,
        TableHead, TableRow, TableSortLabel, Backdrop } from '@material-ui/core';
// icons
import TransformIcon from '@material-ui/icons/Transform';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Onboard from 'bnc-onboard'
import Notify from 'bnc-notify'
import Web3 from 'web3';
//import Portis from '@portis/web3';
const ethers = require('ethers');
let provider = new ethers.getDefaultProvider('ropsten')
const portisDappId = 'ddefb9bf-de03-4b90-878e-9490166117d0';
const HDWalletProvider = require("truffle-hdwallet-provider");
//const portis = new Portis(portisDappId, 'ropsten', { scope: [ 'email' ] } );
const chalk = require('chalk');
const log = console.log;
// Ropsten Uniswap Factory: https://ropsten.etherscan.io/address/0x9c83dce8ca20e9aaf9d3efc003b2ea62abc08351
//import uniswap from "@studydefi/money-legos/uniswap"
const { legos } = require("@studydefi/money-legos");
let web3
web3 = new Web3(Web3.givenProvider || "127.0.0.1:8545");

const factoryAbi = legos.uniswap.factory.abi;
const factoryAddress = legos.uniswap.factory.address;
log(chalk.blue('Factory Address: ', factoryAddress));
const factoryContract = new web3.eth.Contract(factoryAbi, '0x9c83dce8ca20e9aaf9d3efc003b2ea62abc08351'); // Ropsten

// Ropsten DAI Token: https://ropsten.etherscan.io/token/0xaD6D458402F60fD3Bd25163575031ACDce07538D
const DAI_ABI = legos.erc20.dai.abi
const DAI_ADDRESS = '0xaD6D458402F60fD3Bd25163575031ACDce07538D'; //'0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108'
const daiContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);

// erc20 tokens
//legos.erc20.abi;
//legos.erc20.address;

// Ropsten Uniswap Dai Exchange: https://ropsten.etherscan.io/address/0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0
const EXCHANGE_ABI = legos.uniswap.exchange.abi
const EXCHANGE_ADDRESS = '0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0'; //'0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
const exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);

//const web3 = new Web3(portis.provider);

// opens the portis widget
//portis.showPortis();

// set the users email if we know if or want to know it...
//portis.setDefaultEmail('satoshi@portis.io');

// web3.eth.getAccounts((error, accounts) => {
//     console.log(accounts);
// });

const onboard = Onboard({
    dappId: '8e84cd42-1282-4e65-bcd0-da4f7b6ad7a4',
    networkId: 1,
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
    networkId: 1,
    darkMode: true,
    system: 'ethereum',
});


async function connectWallet() {
    await onboard.walletSelect();
    await onboard.walletCheck();    
}

async function getAccounts () {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    web3.eth.sendTransaction({
        from: '',
        to: '',
        value: ''
    }).on('transactionHash', (hash) => {
        notify.hash(hash);
    });
}

const ethOracleAddress = '0x3B6510FE219c9f27663Be9ca50d14dF023a9351F'; // Ropsten
const ethOracleAbi = [{"constant":true,"inputs":[{"name":"_back","type":"uint256"}],"name":"getPreviousTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatestAnswer","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_back","type":"uint256"}],"name":"getPreviousAnswer","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLatestTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_aggregator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
let ethPriceContract = new web3.eth.Contract(ethOracleAbi, ethOracleAddress);
console.log(`Eth price oracle contract ${ethPriceContract}`);
const createStreamAddress = '0x0e43Df5f5B00409831926f761C8Da6bC52E2Ad0f'; // Ropsten
const createStreamAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":false,"internalType":"address","name":"_streamOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_streamId","type":"uint256"},{"indexed":false,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"address","name":"_newOwner","type":"address"},{"indexed":false,"internalType":"bool","name":"_tokensTransferred","type":"bool"}],"name":"StreamTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TokensSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"_user","type":"address"}],"name":"WithdrawMade","type":"event"},{"inputs":[],"name":"MEMBER_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllStreams","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"}],"name":"getStream","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getStreams","outputs":[{"components":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"internalType":"struct IncomeStreamCreator.Stream","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceToRegister","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamAccounts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streamBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"streamOwner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"streams","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"streamsArray","outputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"streamOwner","type":"address"},{"internalType":"uint256","name":"streamValue","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"frequency","type":"uint256"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"uint256","name":"depositAmt","type":"uint256"},{"internalType":"uint256","name":"dateCreated","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_streamId","type":"uint256"},{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"userData","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
let createStreamContract = new web3.eth.Contract(createStreamAbi, createStreamAddress);
console.log("Create Stream Contract: ", createStreamContract);

// portis.onLogin((walletAddress, email, reputation) => {
//     console.log(walletAddress, email, reputation);
// });

// portis.onLogout(() => {
//     console.log('User logged out');
// });
async function runSetup() {
    console.group('Run Setup:')
    // Detect MetaMask
    if(typeof web3 !== 'undefined') {
      // continue execution
      console.log('Welcome!')
      //await loadBlockchainData()

      // test account
      //const account = "0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533";

      //const web3 = await loadWeb3()
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

async function signMessage () {
    const accounts = await web3.eth.getAccounts();
    print(`Wallet address: ${accounts[0].toLowerCase()}`);
  
    const message = "Welcome to Income Stream!";
    const signedMessage = await web3.eth.sign(message, accounts[0]);
    print(`Signed message: ${signedMessage}`);
};
  
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

    function createRow(id, owner, deposit, payment, numberOfPayments, remainingPayments, netPresentValue) {
        return { id, owner, deposit, payment, numberOfPayments, remainingPayments,netPresentValue };
    }

    const streams = [
      //createRow('0x123456', '0xd2cCea05436bf27aE49B01726075449F815B683e', 10000, 293, 36, 28, 8531)
    ]

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
      { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
      { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
      { id: 'deposit', numeric: true, disablePadding: false, label: 'Deposit' },
      { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
      { id: 'noPmts', numeric: true, disablePadding: false, label: 'Duration' },
      { id: 'remainingPmts', numeric: true, disablePadding: false, label: 'Frequency'},
      { id: 'netPresentVal', numeric: true, disablePadding: false, label: 'Date'}
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
    const [frequency, setFrequency] = useState(0);
    const [streamOwner, setstreamOwner] = useState(null);



    const getStreamsForUser = () => {
        let acct = web3.eth.getAccounts().then(console.log);

        createStreamContract.methods.getStreams('0xd2cCea05436bf27aE49B01726075449F815B683e').call()
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
                
                setUserStreams(res);
                setBackdrop(false);
            });
    };

    const [selected, setSelected] = React.useState([]);
    const [backdrop, setBackdrop] = useState(false);
    const [stream, setUserStreams] = useState();

    return (
        <React.Fragment>
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
                        <TableCell align="right">{dateCreated}</TableCell>
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
    let ownerAddress = '0xdDA0E4835D997518C7C4a6b479dA4e3F24Aa84da';

    const [formValues, setFormValues] = useState({
        ownerAddress: '0xdDA0E4835D997518C7C4a6b479dA4e3F24Aa84da',
        newOperator: '',
        stream: {
          id: '0x',
        },
    });

    const [streams, updateStreams] = useState([]);
    const handleAddressChange = (prop) => (event) => {

    }

    const handleStreamChange = (props) => (event) => {

    }

    const handleFormSubmit = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    return (
        <React.Fragment>
            <Grid item xs={12}>
              <Paper className={classes.paperHeading} elevation={3}></Paper>
              <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl} style={{ minWidth: '450' }}>
                                 {/*<InputLabel htmlFor="ownerAddress">Owner</InputLabel>
                               <BootstrapInput id="ownerAddress" value={""} />  */}
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    Current Owner ==> {ownerAddress}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="new-owner-textbox">New Owner</InputLabel>
                                <Tooltip title='Amount of your deposit' placement='top-start'>
                                <BootstrapInput
                                        id="new-owner-textbox"
                                        value={'0xdDA0E4835D997518C7C4a6b479dA4e3F24Aa84da'}
                                        variant="outlined"
                                        color='primary'                                        
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                /></Tooltip>
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    New Owner
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div><br/></div>
                    {/* second row */}
                    <Grid container spacing={3}>
                        <Grid item xs>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="streams">Stream Id</InputLabel>
                                <NativeSelect
                                  id="streams"
                                  value={streams}
                                  onChange={handleStreamChange}
                                  input={<BootstrapInput />}
                                >
                                  <option aria-label="None" value="" />
                                  {streams.map((s, i) => {

                                  })}

                                </NativeSelect>
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    Stream to transfer
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>

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
                </Paper>
              </Grid>
        </React.Fragment>
    )
}

const CreateStreamForm = ({ data, setValue, account }) => {
    console.log('Account: ', account);
    const classes = useStyles();
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
    const maximum = 1000;

    const roundUp = (number, precision) => {
        precision = Math.pow(10, precision);
        return Math.ceil(number * precision) / precision;
    }

    // Minimum tokens to swap
    const MIN_TOKENS = 1
    log(chalk.greenBright("Min Tokens to receive: ", MIN_TOKENS))

    // Set Deadline 1 minute from now
    const moment = require('moment') // import moment.js library
    const now = moment().unix() // fetch current unix timestamp
    const DEADLINE = now + 60 // add 60 seconds
    console.log("Deadline", DEADLINE)

    // Transaction Settings
    const SETTINGS = {
        gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
        gasPrice: web3.utils.toWei('50', 'Gwei'),
        from: '0xd2cCea05436bf27aE49B01726075449F815B683e', // Use your account here
        value: web3.utils.toWei('0.048', 'Ether') // Amount of Ether to Swap
    }

    console.log("Settings", SETTINGS)


    async function swapEthForDai(callback) {
        try {
            let balance
        
            // Check Ether balance BEFORE swap
            balance = await web3.eth.getBalance(SETTINGS.from)
            balance = web3.utils.fromWei(balance, 'Ether')
            console.log("Ether Balance Before Tx:", balance)
        
            // Check Dai balance BEFORE swap
            balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
            balance = web3.utils.fromWei(balance, 'Ether')
            log(chalk.yellow("Dai Balance Before Tx:", balance))
        
            // Perform Swap
            console.log('Performing swap...')
            let result
            result = await exchangeContract.methods.ethToTokenSwapInput(MIN_TOKENS, DEADLINE).send(SETTINGS)
            log(chalk`Successful Swap: {bold.hex('#2AD8D8') https://ropsten.etherscan.io/tx/${result.transactionHash}}`)
        
            // Check Ether balance AFTER swap
            balance = await web3.eth.getBalance(SETTINGS.from)
            balance = web3.utils.fromWei(balance, 'Ether')
            console.log("Ether Balance After Swap:", balance)
        
            // Check Dai balance AFTER swap
            balance = await daiContract.methods.balanceOf(SETTINGS.from).call()
            balance = web3.utils.fromWei(balance, 'Ether')
            log(chalk.yellow("Dai Balance After Swap:", balance))
      
        }
        catch(error) {
            console.log(error)
        }
      
        //callback()
    }

    // Call the contract on-chain and create the new stream
    async function createStreamWithContract() {
        // contact the wallet
        //await connectWallet();
        await loadWeb3();
        // get the eth amount from form in wei
        const amountInEth = amountConverted;
        console.log('Amount in Ether: ', amountInEth);
        console.log('Payment: ',  roundUp(payment.toFixed(0), 2));

        //swapEthForDai();

        await createStreamContract.methods.createStream(amount, duration, frequency, roundUp(payment.toFixed(0), 2))
            .send({ from: '0xd2cCea05436bf27aE49B01726075449F815B683e', value: web3.utils.toWei('.048', 'ether') })
            .then((error, result) => {
                setBackdrop(true);
                if(error){
                    console.error(error);
                    setBackdrop(false)
                }
                // Success amigo
                console.log(result);
                setOpen(false); // close the modal
                setBackdrop(false)




                // navigate to the streams tab
                setValue(2);
        });
    }

    // Price Feed for Eth
    (async function getEthPrice() {
        let priceOfEth = 0;
        priceOfEth = await ethPriceContract.methods.getLatestAnswer().call();
        setCurrentEthPrice(priceOfEth);
        setAmountConverted(amount / currentEthPrice);
        console.log(`Current Eth price: ${priceOfEth}`);
    })(setTimeout(15000));

    // Price Feed for Dai


    const handleOpen = (event, value) =>{
        setOpen(true);
        console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`)
        console.log(`Payment Total: ${paymentTotal}`);
        // set the form values in one object
        //setFormValues({ ...formValues, [prop]: event.target.value });
        
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
            interest = pmt * .0875; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .1075; // 10.75% PA
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
        setAmount(event.target.value);
        let pmt = (amount / duration) / frequency;
        let interest
        if(duration == 1){
            interest = pmt * .0675; // 6.75% PA
        } else if(duration == 3){
            interest = pmt * .0875; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .1075; // 10.75% PA
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
            interest = pmt * .0875; // 8.75% PA
        } else if(duration == 5) {
            interest = pmt * .1075; // 10.75% PA
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
    const createIncomeStream = (prop) => (event) => {
        console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`);
        // set the form values in one object
        setFormValues({ ...formValues, [prop]: event.target.value });

    };

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

    const rows = [
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
                      <div className={classes.paper}>
                          <h2 id="create-stream-confirmation">Please Confirm Your Selection</h2>
                          <div>
                              <Table>
                                  <TableHead>
                                      <TableRow>
                                          <TableCell>Duration</TableCell>
                                          <TableCell align="right">Frequency</TableCell>
                                          <TableCell align="right">Amount</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {rows.map((row) => (
                                          <TableRow key={row.name}>
                                              <TableCell align="right">{row.duration}</TableCell>
                                              <TableCell align="right">{row.frequency}</TableCell>
                                              <TableCell align="right">{row.amount}</TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                              <Button
                                  onClick={createStreamWithContract}
                              >
                                  Let's Do This!
                              </Button>
                          </div>
                      </div>
                  </Fade>
              </Modal>

                
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={3}>
                    <Grid item xs>
                    <FormControl className={classes.formControl} style={{ minWidth: 200 }}>
                        {/* <InputLabel htmlFor="amountConverted" style={{ color: '#009be5' }}>
                            Amount in [selecected] currency
                        </InputLabel> */}
                        <Tooltip title='Amount of your deposit' placement='top-start'>
                        <BootstrapInput
                                id="amountConverted"
                                value={amountConverted == null ? 0 : amountConverted.toFixed(18)}
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

/**
 * Full width tabs
 */
function FullWidthTabs({account}) {
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
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
             <CreateStreamForm setValue={setValue} account={account} />
          </TabPanel>
          <TabPanel value={value} index={1}>
              {/* some panel here  */}
              <TransferStreamForm />
          </TabPanel>
          <TabPanel value={value} index={2} >
              {/* some panel here  */}
              <MyStreams account={'0xd2cCea05436bf27aE49B01726075449F815B683e'} />
          </TabPanel>
        </SwipeableViews>
      </div>
    );
}

export default FullWidthTabs;