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
// icons
import AddIcon from '@material-ui/icons/Add';
import TransformIcon from '@material-ui/icons/Transform';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
// blockchain etc.
import Web3 from 'web3';

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
    const { children, value, index, ...other } = props;

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
           <CreateStreamForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
            {/* some panel here  */}
            <TransferStreamForm />
        </TabPanel>
        <TabPanel value={value} index={2} >
            {/* some panel here  */}
            <MyStreams />
        </TabPanel>
      </SwipeableViews>
    </div>
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

    // test for ui testing
    const streams = [
        {
            streamId: 'address',
            owner: 'address',
            payment: 1000,
            deposit: 10000,
            numberOfPayments: 12
        },
        {
            streamId: 'address',
            owner: 'address',
            payment: 1000,
            deposit: 10000,
            numberOfPayments: 12
        },
        {
            streamId: 'address',
            owner: 'address',
            payment: 1000,
            deposit: 10000,
            numberOfPayments: 12
        }
    ]

    const handleFormSubmit = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    return(
        <React.Fragment>
            <Grid item xs={12}>
              <Paper className={classes.paperHeading} elevation={3}>
                
              </Paper>
              <Paper className={classes.paper} elevation={6}>                  
                    <Grid container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <ul>
                          {streams.map((stream, index) => {
                              return  <li key={index}>{stream.streamId}</li>
                          })}
                          </ul>        
                        </Grid>
                    </Grid>                       
                </Paper>
              </Grid>
        </React.Fragment>
    )
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

function CustomizedSelects() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
        <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-textbox">Age</InputLabel>
            <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
        <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select-label">Age</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={age}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={age}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
        </FormControl>
    </div>
  );
}

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
                                <InputLabel width='240' htmlFor="demo-customized-select-native">Owner</InputLabel>
                                <BootstrapInput id="demo-customized-textbox" value={ownerAddress} />
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
                            <InputLabel htmlFor="demo-customized-select-native">Stream Id</InputLabel>
                                <NativeSelect
                                  id="demo-customized-select-native"
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

const CreateStreamForm = ({data}) => {
    loadWeb3();
    const classes = useStyles();

    const [duration, setDuration] = useState(null);
    const [productType, setProductType] = useState('IMMEDIATE');
    const [amount, setAmount] = useState(null);
    const [deferredDuration, setDeferredDuration] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [payment, setPayment] = useState(null);
    const [depositType, setDepositType] = useState(null);
    const [formValues, setFormValues] = useState({
        productType: '',
        duration: '',
        deferredDuration: '',
        frequency: '',
        amount: '',
        payment: '',
    });


    //myflashloancontract();

    const handleFrequencyChange = (event, newValue) => {
        const frequency = event.target.name;        
        setFrequency(event.target.value);
        console.log(event.target.value);
    };

    const handlePaymentChange = (event, newValue) => {
      const payment = event.target.value;
      //setPayment(payment);


    }
    
    const handleAmountChange = (event, newValue) => {
        const amount = event.target.value;
        setAmount(event.target.value);        

        switch (frequency) {
          case 1:
              // if one payment the duration has to be 3 years
              //setDuration(36)

              
              break;

          case 4:
              // quarterly payments

              break;

          case 12:
              // monthly payments

              break;

          default:
              // default shit here
              break;
        }

        
        let pmt = (amount / duration) / frequency;
        let interest = pmt * .055;
        pmt = pmt + interest;
        setPayment(pmt);

        console.log(amount);
    };

    const handleDepositChange = (event, newValue) => {
        const depositType = event.target.value;
        setDepositType(depositType);
    }


    const handleDurationChange = (event, newValue) => {
        const duration = event.target.name;        
        setDuration(event.target.value);
        console.log(duration);
    };

  
    const handleProductTypeChange = (event, newValue) => {
        const product = event.target.name;
        
        setProductType(event.target.value)
        console.log(product)
    };


    const handleDeferredDurationChange = (event, newValue) => {
        const deferredDuration = event.target.name;

        setDeferredDuration(event.target.value)
        console.log(deferredDuration)
    };


    const handleFormSubmit = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

  
    const createIncomeStream = (prop) => (event) => {
        console.log(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`)

        alert(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequency}`)

        // set the form values in one object
        setFormValues({ ...formValues, [prop]: event.target.value });

    };


    useEffect(() => {
      //
      return () => {
        //
      }
    }, []);

  
    // ToDo: Impliment in future
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
    
    // Current Create Stream Form
    return (
        <React.Fragment>
              <Grid item xs={12}>
              <Paper className={classes.paperHeading} elevation={3}>
                
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
                                    <option value={'USDC'}>USDC</option>
                                    <option value={'BUSD'}>BUSD</option>
                                    <option value={'TUSD'}>TUSD</option>
                                  </NativeSelect>
                                  <FormHelperText style={{ color: '#FE6B8B' }}>
                                      Select your currency / token
                                  </FormHelperText>
                              </FormControl>  
                            </Grid>
                            <Grid item xs>
                                <FormControl className={classes.formControl}>
                               
                                </FormControl>              
                            </Grid>
                        </Grid>                        
                        <div><br/></div>
                        <Grid container spacing={3}>
                           
                            <Grid item xs>
                               <FormControl className={classes.formControl}>
                               <InputLabel htmlFor="duration" style={{ color: '#009be5' }}>Duration in Years</InputLabel>
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
                                    <option value={7}>Seven</option>
                                    <option value={10}>Ten</option>
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
                                        onClick={createIncomeStream()}
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