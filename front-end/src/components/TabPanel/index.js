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
// blockchain etc.
import Web3 from 'web3';
var web3 = new Web3(Web3.givenProvider || "127.0.0.1:8545");


const createStreamAddress = '0x36Da2253Ee9c1e727A53a18bba02E2D3994Cb9AD';
const createStreamAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_streamOwnerId","type":"address"},{"indexed":false,"internalType":"uint256","name":"_streamAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamLength","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_streamFrequency","type":"uint256"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"source","type":"string"}],"name":"Test","type":"event"},{"inputs":[],"name":"MEMBER_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_frequency","type":"uint256"},{"internalType":"uint256","name":"_payment","type":"uint256"}],"name":"createStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minWaitingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"}],"name":"payStream","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"priceToRegister","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"streamId","type":"uint256"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"userData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"}];

let createStreamContract = new web3.eth.Contract(createStreamAbi, createStreamAddress);
console.log("Contract retreived: ", createStreamContract);



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
          {/* <Tab label="Operators" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
           <CreateStreamForm setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
            {/* some panel here  */}
            <TransferStreamForm />
        </TabPanel>
        <TabPanel value={value} index={2} >
            {/* some panel here  */}
            <MyStreams />
        </TabPanel>
        {/* <TabPanel value={value} index={3} >
            <Operators />
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}

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

function EnhancedTable(props) {

    function createRow(id, owner, deposit, payment, numberOfPayments, remainingPayments) {
        return { id, owner, deposit, payment, numberOfPayments, remainingPayments };
    }

    const streams = [
      createRow('0x123456', '0xd2cCea05436bf27aE49B01726075449F815B683e', 10000, 293.06, 36, 28),
      createRow('0x654321', '0xd2cCea05436bf27aE49B01726075449F815B683e', 10000, 175.83, 60, 55),
      createRow('0x132564', '0xd2cCea05436bf27aE49B01726075449F815B683e', 10000, 879.17, 12, 5)
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
      { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
      { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
      { id: 'deposit', numeric: true, disablePadding: false, label: 'Deposit' },
      { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
      { id: 'noPmts', numeric: true, disablePadding: false, label: 'No. Pmts' },
      { id: 'remainingPmts', numeric: true, disablePadding: false, label: 'Pmts Remain'},
    ];

    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const [selected, setSelected] = React.useState([]);

    return (
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
              {stableSort(streams, getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <TableRow>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.owner}</TableCell>
                      <TableCell align="right">{row.deposit}</TableCell>
                      <TableCell align="right">{row.payment}</TableCell>
                      <TableCell align="right">{row.numberOfPayments}</TableCell>
                  <TableCell align="right">{row.remainingPayments}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
      </Table>
    );
}

/**
 * My Streams
 * @param {object} data
 */
const MyStreams = ({data}) => {
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
                  <EnhancedTable />
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <ul>
                          {streams.map((stream, index) => {
                              return (
                              <li key={index}>
                                Stream ID: {stream.streamId}
                                Owner: {stream.owner}
                                Deposit: {stream.deposit}
                                Payment: {stream.payment}
                                No of Pmts: {stream.numberOfPayments}
                              </li>
                              )
                          })}
                          </ul>
                        </Grid>
                    </Grid> */}
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
const TransferStreamForm = ({props}) => {
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
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel width='240' htmlFor="ownerAddress">Owner</InputLabel>
                                <BootstrapInput id="ownerAddress" value={ownerAddress} />
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    Current Owner
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="demo-customized-textbox">New Owner</InputLabel>
                                <BootstrapInput id="demo-customized-textbox" />
                                <FormHelperText style={{ color: '#FE6B8B' }}>
                                    New Owner
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                    </Grid>
                    <div><br/></div>
                    {/* second row */}
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <FormControl className={classes.formControl}>

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

const CreateStreamForm = ({ data, setValue }) => {
    //loadWeb3();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [duration, setDuration] = useState(null);
    const [productType, setProductType] = useState('IMMEDIATE');
    const [amount, setAmount] = useState(null);
    const [deferredDuration, setDeferredDuration] = useState(null);
    const [frequency, setFrequency] = useState(0);
    const [payment, setPayment] = useState(null);
    const [depositType, setDepositType] = useState(null);
    const [amountConverted, setAmountConverted] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
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
    const maximum = 1000

    async function createStreamWithContract() {
      await createStreamContract.methods.createStream(amount, duration, frequency, payment.toFixed(0))
      .call({ from: '0x51Caa385AB6363F6dF543BaEbe9501F057A8638e', value: web3.utils.toBN(1) })
      .then((error, result) => {
        if(error){
          console.error(error);;
        }
        console.log(result);
        setOpen(false);

        // navigate to the streams tab
        setValue(2);


      })
    }


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

    //myflashloancontract();

    const handleFrequencyChange = (event, newValue) => {
        const frequency = event.target.value;
        setFrequency(frequency);
        console.log(frequency);
        // need to refresh the rest ...
        let pmt = (amount / duration) / frequency;
        let interest = pmt * .055; // 5.5% PA
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
        let interest = pmt * .055; // 5.5% PA
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

        //setTotalPayments(payment * frequency * duration);
    };

    const handleDurationChange = (event, newValue) => {
        const duration = event.target.value;
        setDuration(duration);
        console.log(duration);
        let pmt = (amount / duration) / frequency;
        let interest = pmt * .055; // 5.5% PA
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
              <Paper className={classes.paperHeading} elevation={3}>
                  {/* Show account number here and some other shortcuts/info */}
                  <Typography>Account: 0x</Typography>
              </Paper>
              <Paper className={classes.paper} elevation={6}>
                    {/* first row */}
                    <Grid container spacing={3}>
                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                                  {/* <TextField label="Immediate Stream" variant="outlined" disabled/> */}
                                  <InputLabel htmlFor="productType">Product Type</InputLabel>
                                    <BootstrapInput value='Immediate' id="productType" disabled />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                               <FormControl className={classes.formControl}>
                               <InputLabel htmlFor="depositType" style={{ color: '#009be5' }}>Deposit Type</InputLabel>
                                  <NativeSelect
                                    id="depositType"
                                    value={depositType}
                                    onChange={handleDepositChange}
                                    input={<BootstrapInput />}
                                  >
                                    <option aria-label="None" value="" />
                                    <option value={'ETH'}>ETH</option>
                                    <option value={'DAI'}>DAI</option>
                                    {/* <option value={'USDC'}>USDC</option>
                                    <option value={'BUSD'}>BUSD</option>
                                    <option value={'TUSD'}>TUSD</option> */}
                                  </NativeSelect>
                                  <FormHelperText style={{ color: '#FE6B8B' }}>
                                      Select your currency / token
                                  </FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="amountConverted" style={{ color: '#009be5' }}>
                                        Amount in [selecected] currency
                                    </InputLabel>
                                    <BootstrapInput
                                          id="amountConverted"
                                          value={amountConverted == null ? 0 : amountConverted.toFixed(0)}
                                          variant="outlined"
                                          color='primary'
                                          disabled
                                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                      />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div><br/></div>
                        <Grid container spacing={3}>
                            <Grid item xs>
                               <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="duration" style={{ color: '#009be5' }}>
                                      Duration in Years
                                  </InputLabel>
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
                                  <FormHelperText style={{ color: '#FE6B8B' }}>
                                      How long do you want to be paid?
                                  </FormHelperText>
                              </FormControl>
                            </Grid>
                            <Grid item xs>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="frequency" style={{ color: '#009be5' }}>Frequency</InputLabel>
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
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        How often do you want your payments?
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="totalPayments" style={{ color: '#009be5' }}>
                                        Total Payments.
                                    </InputLabel>
                                    <BootstrapInput
                                          id="totalPayments"
                                          value={paymentTotal == null ? 0 : paymentTotal.toFixed(2)}
                                          variant="outlined"
                                          color='primary'
                                          disabled
                                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                      />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div><br/></div>
                        {/* second row */}
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="amount" style={{ color: '#009be5' }}>
                                            Amount in USD
                                    </InputLabel>
                                    <BootstrapInput
                                        id="amount"
                                        value={amount}
                                        variant="outlined"
                                        onChange={handleAmountChange}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />

                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        Enter amount you wish to contribute
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl>
                                <InputLabel htmlFor="amount" style={{ color: '#009be5' }}>
                                            Amount in USD
                                    </InputLabel>
                                      <BootstrapInput
                                          id="payment"
                                          value={payment == null ? 0 : payment.toFixed(2)}
                                          variant="outlined"
                                          color='primary'
                                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                      />
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                      The amount you will receive
                                    </FormHelperText>
                                </FormControl>

                            </Grid>
                            <Grid item xs><br />
                                <Tooltip title='Create the Stream'>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        color='primary'
                                        onClick={handleOpen}
                                        startIcon={<BlurLinearIcon />}
                                    >Create</Button>
                                </Tooltip>
                            </Grid>
                    </Grid>
                </Paper>
              </Grid>
        </React.Fragment>
    );

}

export default FullWidthTabs;