import React from 'react';
import TabPanel from '../TabPanel/index';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function MainTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
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

MainTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
}));

function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="What is Income Jar?" {...a11yProps(0)} />
            <Tab label="How" {...a11yProps(1)} />
            <Tab label="Benefits" {...a11yProps(2)} />
            <Tab label="Security" {...a11yProps(3)} />
            <Tab label="Safety" {...a11yProps(4)} />
            <Tab label="FAQ" {...a11yProps(5)} />
            <Tab label="Streams" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <MainTabPanel value={value} index={0}>
            What is Income Jar?
        </MainTabPanel>
        <MainTabPanel value={value} index={1}>
          How
        </MainTabPanel>
        <MainTabPanel value={value} index={2}>
            <Typography>
                <p>
                With steady growth, a healthy outlook and continued support. 
                We offer the best anuity on all investment at top standards, use and agreements.
                </p>
                <p>

                </p>
            </Typography>
        </MainTabPanel>
        <MainTabPanel value={value} index={3}>
          Security
        </MainTabPanel>
        <MainTabPanel value={value} index={4}>
          <Typography>
              <p>
                  Know your investment is safe with our core principles of integrity and 
                  proven history of success. The safety of our product is in the peace of 
                  mind that our peers have returns and outlays yet small to see at the start. 
                  We offer true purpose accounts, with direct access for our peers. Life 
                  time bonuses that can be stored indefinitely. For future worth.
              </p>
              <p>
              Personal info is kept encrypted and value adds or income completely streamed 
              and calibrated for our investors to gain the edge to hold tightly onto ones investment.
              </p>
          </Typography>
        </MainTabPanel>
        <MainTabPanel value={value} index={5}>
            <Typography>
                <ol>
                    <li>Do I require to sign anything or continue to invest in the stream.</li>
                    <li>What is minimum investment?</li>
                    <li>Is my outlay of capital gains need taxes?</li>
                    <li>Is my investment safe in the long run?</li>
                    <li>Do I require personal requests can my investment be payed out fully upoun request?</li>
                    <li>How do I watch the growth on the market of my investment?</li>
                    <li>Is there availability of a team to contribute ideas, chat or info?</li>
                    <li>Is this variable bonds structuring?</li>
                    <li>My ETH blockchain value is important, why?</li>
                    <li>Is there availability of balance on request?</li>
                    <li>How does my wallet withdraw investment?</li>
                    <li>Is there any chance I could loose my investment, long term?</li>
                </ol>
            </Typography>
        </MainTabPanel>
        <MainTabPanel value={value} index={6}>
            <TabPanel other='test'/>
        </MainTabPanel>
      </div>
    );
}

const Home = (props) => {


    return (
        <React.Fragment>
            <ScrollableTabsButtonAuto other='test' />


           
        </React.Fragment>
    )
}

export default Home;