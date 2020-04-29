import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar, Form } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
//import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'
//import backgroundImage from '../../inetLogo.png' 
import { Container, CssBaseline, Typography, FormHelperText } from '@material-ui/core'
import { Table, TableBody, TableCell,
         TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import BackupIcon from '@material-ui/icons/Backup';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import '../../index.css'
import Web3 from "web3";
import Onboard from 'bnc-onboard'

let web3

const onboard = Onboard({
    dappId: '8e84cd42-1282-4e65-bcd0-da4f7b6ad7a4',
    networkId: 5777, // 4 = Rinkeby, 3 = Ropsten, 1 = Main
    darkMode: true,
    subscriptions: {
        wallet: wallet => {
            web3 = new Web3(wallet.provider)
            console.log(`${wallet.name} is now connected!`)
        },
        balance: balance => {

            console.log(balance)
        }
    }
})

const currentState = onboard.getState()
console.log(currentState)


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    table: {
        minWidth: 700,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: '#9400d3',
      backgroundColor: '#282c34'
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        backgroundColor: '#282c34',
    }
  }));
  
/**
 * @dev IncomeStreamContent Page Class Component
 * 
 */
class IncomeStreamContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            loading: true,
        }
        
        //this.loadWeb3()
        //this.loadBlockchainData()    
    }  
    

    async loadBlockchainData() {
        this.setState({ loading: true })
        const web3 = window.web3
        // get the accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

    
        const ethBalance = await web3.eth.getBalance(this.state.account)
        //ethBalance = web3.utils.fromWei(ethBalance, 'ether')
        this.setState({ ethBalance })
    }
    
    async loadWeb3() {
        this.setState({ loading: true })
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          this.setState({ loading: false })
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
          this.setState({ loading: false })
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    render(){
        return(
            <Container className='app-container'>
            <Grid container spacing={1} className='app-content'>
              <ScrollableTabsButtonPrevent />                  
              </Grid>
          </Container>
        )
    }

}

function ScrollableTabsButtonPrevent() {
    const classes = useStyles();    
    const [value, setValue] = React.useState(0);  

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };  


  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgb(83, 10, 133)' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<Tooltip title='Add Stream'><AddIcon /></Tooltip>} aria-label="create-stream" {...a11yProps(0)} />
          <Tab icon={<Tooltip title='Transfer Stream'><ImportExportIcon /></Tooltip>} aria-label="transfer-stream" {...a11yProps(1)} />
          <Tab icon={<Tooltip title='Renew Stream'><AutorenewIcon /></Tooltip>} aria-label="renew-stream" {...a11yProps(2)} />
          <Tab icon={<Tooltip title='Backup Stream'><BackupIcon /></Tooltip>} aria-label="backup-stream" {...a11yProps(3)} />
          <Tab icon={<Tooltip title='?'><ThumbDown /></Tooltip>} aria-label="" {...a11yProps(4)} />
          <Tab icon={<Tooltip title='?'><ThumbUp /></Tooltip>} aria-label="" {...a11yProps(5)} />
          <Tab icon={<Tooltip title='Help'><HelpIcon /></Tooltip>} aria-label="help" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  style={{ backgroundColor: 'rgb(83, 10, 133)' }}>
        <FormPanel data={{ name: 'Jason Romero', x: '5000' }}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

function FormPanel({data}) {
    const classes = useStyles();
    const [duration, setDuration] = React.useState(0);
    const [productType, setProductType] = React.useState(0);
    const [deferredDuration, setDeferredDuration] = React.useState(0);

    
    const handleDurationChange = (event, newValue) => {
        const duration = event.target.name;
        
        setDuration(event.target.value)
        console.log(event.target.value)
    }
  
    const handleProductTypeChange = (event, newValue) => {
        const product = event.target.name;
        
        setProductType(event.target.value)
        console.log(event.target.value)
    }

    const handleDeferredDurationChange = (event, newValue) => {
        const deferredDuration = event.target.name;

        setDeferredDuration(event.target.value)
        console.log(event.target.value)
    }
  
    const createIncomeStream = () => {
        console.log(productType, ' ', duration, ' ', deferredDuration)
        alert(productType + duration + deferredDuration)
    }
  
    let deferredTime
    if(productType == 'DEFERRED'){
        deferredTime =  <React.Fragment><InputLabel htmlFor="age-native-helper" style={{ color: '#009be5' }}>
                          Deferred Duration in Years
                        </InputLabel>
                        <Select 
                            style={{ color: '#009be5' }}
                            native
                            value={deferredDuration}
                            onChange={handleDeferredDurationChange}
                            inputProps={{
                            name: 'deferredDuration',
                            id: 'age-native-helper',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>One</option>
                            <option value={3}>Three</option>
                            <option value={5}>Five</option>
                        </Select>
                        <FormHelperText style={{ color: '#FE6B8B' }}>helper text</FormHelperText> 
                        </React.Fragment>  
    }
    
    return (
        <React.Fragment>            
                  <Grid container item lg={12} >
              <Grid item xs={12}>
              <Paper className={classes.paper}>
                  {data.name} | {data.x}
                    {/* first row */}
                      <Grid container spacing={3}>
                          <Grid item xs>
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
                                  <option value={'DEFERRED'}>Deferred</option>
                              </Select>
                              <FormHelperText style={{ color: '#FE6B8B' }}>
                                  *Deferred gains are generally higher  
                              </FormHelperText>
                          </Grid>
                          <Grid item xs>
                            {deferredTime}
                          </Grid>
                          <Grid item xs>
                          <InputLabel htmlFor="age-native-helper" style={{ color: '#009be5' }}>
                                Duration in Years
                              </InputLabel>
                              <Select 
                                style={{ color: '#009be5' }}
                                native
                                value={duration}
                                onChange={handleDurationChange}
                                inputProps={{
                                  name: 'duration',
                                  id: 'age-native-helper',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={1}>One</option>
                                <option value={3}>Three</option>
                                <option value={5}>Five</option>
                              </Select>
                              <FormHelperText style={{ color: '#FE6B8B' }}>helper text</FormHelperText>                         
                          </Grid>
                      </Grid>
                      {/* second row */}
                      <Grid container spacing={3}>
                          <Grid item xs>
                            
                            
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
                
            </Grid>
        </React.Fragment>
    )

}

function FormRow(props) {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>{props.name}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  

IncomeStreamContent.propTypes = {

}

export default IncomeStreamContent;