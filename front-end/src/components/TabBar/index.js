import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//import MoneyButton from '@moneybutton/react-money-button'
import { Typography, FormHelperText } from '@material-ui/core'
import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import { fade } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Tab from '@material-ui/core/Tab';
import BackupIcon from '@material-ui/icons/Backup';
import Box from '@material-ui/core/Box';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import '../../index.css'
import CreateStreamForm from '../IncomeStream/createStream.js'
import Web3 from "web3";

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
          {/* <Tab icon={<Tooltip title='?'><ThumbDown /></Tooltip>} aria-label="" {...a11yProps(4)} />
          <Tab icon={<Tooltip title='?'><ThumbUp /></Tooltip>} aria-label="" {...a11yProps(5)} /> */}
          <Tab icon={<Tooltip title='Help'><HelpIcon /></Tooltip>} aria-label="help" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}  style={{ backgroundColor: 'rgb(83, 10, 133)' }}>
        <CreateStreamForm 
            data={{ name: 'Jason Romero', x: '5000' }
        }/>
      </TabPanel>
      <TabPanel value={value} index={1}>
          Transfer my stream
      </TabPanel>
      <TabPanel value={value} index={2}>
          Renew/AddMoney to Stream
      </TabPanel>
      <TabPanel value={value} index={3}>
          Backup my stream??
      </TabPanel>
      
      {/* <TabPanel value={value} index={4}>
            Help Section
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
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


export default ScrollableTabsButtonPrevent;