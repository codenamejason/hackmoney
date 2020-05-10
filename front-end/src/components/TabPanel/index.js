import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Paper, Typography, FormControl, InputLabel, Select,
          FormHelperText, Input, InputAdornment, Tooltip, Button,
          TextField, 
          FormControlLabel} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';

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
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2} >
            {/* some panel here  */}
            Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const CreateStreamForm = ({data}) => {
  
    const classes = useStyles();
    const [duration, setDuration] = React.useState(0);
    const [productType, setProductType] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [deferredDuration, setDeferredDuration] = React.useState(0);
    const [frequecny, setFrequency] = React.useState(0);
    const [formValues, setFormValues] = React.useState({
        productType: '',
        duration: '',
        frequency: '',
        amount: '',
    });

    //myflashloancontract();

    const handleFrequencyChange = (event, newValue) => {
        const frequency = event.target.name;        
        setFrequency(event.target.value)
        console.log(event.target.value)
    };
    
    const handleAmountChange = (event, newValue) => {
        const amount = event.target;        
        setAmount(event.target.value)
        console.log(event.target.value)
    };

    const handleDurationChange = (event, newValue) => {
        const duration = event.target.name;
        
        setDuration(event.target.value)
        console.log(event.target.value)
    };
  
    const handleProductTypeChange = (event, newValue) => {
        const product = event.target.name;
        
        setProductType(event.target.value)
        console.log(event.target.value)
    };

    const handleDeferredDurationChange = (event, newValue) => {
        const deferredDuration = event.target.name;

        setDeferredDuration(event.target.value)
        console.log(event.target.value)
    };

    const handleFormSubmit = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };
  
    const createIncomeStream = () => {
        console.log(productType, ' ', duration, ' ', amount, '', frequecny)
        alert(`Product: ${productType}, Duration: ${duration}, Amount: ${amount}, Frequency: ${frequecny}`)
    };
  
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
                                    <TextField label="Immediate Stream" variant="outlined" disabled/>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                               <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="duration" style={{ color: '#009be5' }}>
                                      Duration in Years
                                  </InputLabel>
                                  <Select 
                                      style={{ color: '#009be5' }}
                                      native
                                      value={duration}
                                      onChange={handleDurationChange}
                                      inputProps={{
                                      name: 'duration',
                                      id: 'duration',
                                      }}
                                  >
                                      <option aria-label="None" value="" />
                                      <option value={1}>One</option>
                                      <option value={3}>Three</option>
                                      <option value={5}>Five</option>
                                      {/* <option value={7}>Seven</option>
                                      <option value={10}>Ten</option> */}
                                  </Select>
                                  <FormHelperText style={{ color: '#FE6B8B' }}>
                                      How long do you want to be paid?
                                  </FormHelperText>
                              </FormControl>  
                            </Grid>
                            <Grid item xs>
                            <FormControl className={classes.formControl}>                                    
                                    <InputLabel htmlFor='frequency' style={{ color: '#009be5' }}>
                                        Frequency
                                    </InputLabel>
                                    <Select 
                                            style={{ color: '#009be5' }}
                                            native
                                            value={frequecny}
                                            onChange={handleFrequencyChange}
                                            inputProps={{
                                            name: 'frequency',
                                            id: 'frequency',
                                            }}
                                    >
                                            <option aria-label="None" value="" />
                                            <option value={'WW'}>Weekly</option>
                                            <option value={'MM'}>Monthly</option>.
                                            <option value={'QQ'}>Quarterly</option>
                                            <option value={'YY'}>Anually</option>
                                    </Select>
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        How often do you want your payments?
                                    </FormHelperText>
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
                                    <Input
                                        id="amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                    
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        Enter amount you wish to contribute
                                    </FormHelperText>
                                </FormControl>                 
                            </Grid>
                            <Grid item xs={6}>
                               
                            
                            </Grid>
                            <Grid item xs><br />                   
                                <Tooltip title='Create the Stream'>
                                    
                                    <Button
                                        variant='contained'
                                        size='large'
                                        color='primary'
                                        onClick={createIncomeStream}
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