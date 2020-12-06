import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//import MoneyButton from '@moneybutton/react-money-button'
import { Typography, FormHelperText, FormControl } from '@material-ui/core'
import { Button, InputBase, Input } from '@material-ui/core'
import { fade } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import web3 from 'web3'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 700,
    },
    paperHeading: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#9400d3',
        backgroundColor: '#48A5BE'
      },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: '#9400d3',
      backgroundColor: '#48A5BE'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    tabPanel: {
        backgroundColor: '#306E7E',
    }
  }));

function CreateStreamForm({data}) {
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
                  {data.name} | {data.x}
              </Paper>
              <Paper className={classes.paper} elevation={6}>
                  

                    {/* first row */}
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <FormControl>
                                    <InputLabel 
                                        htmlFor="produt-type" 
                                        style={{ color: '#009be5' }}
                                    >
                                        Product Type
                                    </InputLabel>
                                    <Select style={{ color: '#009be5' }}
                                        native
                                        value={productType}
                                        onChange={handleProductTypeChange}
                                        inputProps={{
                                        name: 'productType',
                                        id: 'product-type'
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={'IMMEDIATE'}>Immediate</option>
                                        {/* <option value={'DEFERRED'}>Deferred</option> */}
                                    </Select>
                                    <FormHelperText style={{ color: '#FE6B8B' }}>
                                        Select the type of stream you want to buy
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                            <FormControl>                                    
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
                                            id: 'age-native-helper',
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
                            <Grid item xs>
                                <FormControl>
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
                        </Grid>                        
                        <div><br/></div>
                        {/* second row */}
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <FormControl>
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
                            <Grid item xs>                            
                                <Tooltip title='Create the Stream'>
                                    <Button 
                                        variant='outlined' 
                                        color='primary'
                                        onClick={createIncomeStream}   
                                    >Create</Button>
                                </Tooltip>
                            </Grid>
                    </Grid>
                </Paper>
              </Grid>
        </React.Fragment>
    )

}

export default CreateStreamForm;