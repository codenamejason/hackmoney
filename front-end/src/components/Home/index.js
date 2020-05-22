import React from 'react';
import TabPanel from '../TabPanel/index';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box, Paper } from '@material-ui/core';


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

function ScrollableTabsButtonAuto({data}) {
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
            <Tab label={data.one.name} {...a11yProps(0)} />
            <Tab label={data.two.name} {...a11yProps(1)} />
            <Tab label={data.three.name} {...a11yProps(2)} />
            <Tab label={data.four.name} {...a11yProps(3)} />
            <Tab label={data.five.name} {...a11yProps(4)} />
            <Tab label={data.six.name} {...a11yProps(5)} />
            <Tab label={data.seven.name} {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <MainTabPanel value={value} index={0}>
            <Paper elevation={3}>
                <Typography variant="h4">Income Stream</Typography>
                <Typography>

                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={1}>
          <Paper elevation={3} >
              <Typography variant="h4">The Legal Stuff</Typography>
              <Typography >
                  <p>Just About Right Holdings, LLC is an independent, self-funded company. We provide 
                  a client-side tool to create income streams using DeFi protocols.</p>
                  <p>We do not collect, hold, or store keys, account information, or the collection
                  of data, and do not use your data for marketing or advertising.
                  </p>
                  
              </Typography>
          </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={2}>
            <Paper>
                <Typography variant="h4">Benefits</Typography>
                <Typography>
                    <p>
                      With steady growth, a healthy outlook and continued support. 
                      We offer the best anuity on all investment at top standards, use and agreements.
                    </p>
                    <p>

                    </p>
                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={3}>
            <Paper elevation={3}>
                <Typography variant="h4">Security</Typography>
                <Typography>
                    <p>
                    With a business module, our court ship from payment from investor to 
                    return for investor. All covered by our own ............... security. 
                    Always staying vigilant to attackers and on guard with 'insureNET' for the 
                    assets to be managed, professionally and basis of one's own future.
                    </p>
                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={4}>
            <Paper elevation={3}>
                <Typography variant="h4">Safety</Typography>
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
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={5}>
            <Paper elevation={3}>
                <Typography variant="h4">Frequently Asked Questions</Typography>
                <Typography>
                    <ul style={{ listStyle: 'none' }}>
                        <li><b>Q. Do I require to sign anything or continue to invest in the stream.</b></li>
                        <li><i>A. There is no signature and no commitment to continue to invest required.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. What is minimum investment?</b></li>
                        <li><i>A. The minumum investment is $1000 USD</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is my outlay of capital gains need taxes?</b></li>
                        <li><i>A. Yes, at the end of each tax year for US based customers there will be a document.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is my investment safe in the long run?</b></li>
                        <li><i>A. Yes, your ivestment is locked up in a stable token gaining a stable interest rate.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Do I require personal requests can my investment be payed out fully upoun request?</b></li>
                        <li><i>
                            A. No, once you make your deposit your funds are locked in at the set payout intervals
                            and amounts that you created.
                        </i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. How do I watch the growth on the market of my investment?</b></li>
                        <li><i>A. There is nothing you need to do. Your payments are guaranteed as agreed when the income stream was created.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is there availability of a team to contribute ideas, chat or info?</b></li>
                        <li><i>A. Yes, we have an active team that looks continuously at current and future investments for our customers.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is this variable bonds structuring?</b></li>
                        <li><i>A. No. This is an annuity product on the Ethereum blockchain.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Can I do multiple accounts and investment, say for other family members?</b></li>
                        <li><i>A. Yes, and encourage people to try out different products and timelines.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. My ETH blockchain value is important, why?</b></li>
                        <li><i>A. Not as important as if you were directly investing in ETH. We lock up your funds in stablecoins pegged at the US Dollar.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is there availability of balance on request?</b></li>.
                        <li><i>A. yes, you can get the balance of your payments by going to the 'Myu Streams' tab.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. How does my wallet withdraw investment?</b></li>
                        <li><i>A. By holding the JARs tokens you will be paid automatically on the frequency you selected.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Is there any chance I could loose my investment, long term?</b></li>
                        <li><i>
                            A. There is always risk when ivesting and we at Just About Right Holdings will guarantee 60% of your
                            initial investment and get insurance for the rest.
                        </i></li>
                        <li>&nbsp;</li>
                    </ul>
                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={6}>
            <TabPanel data="test" />
        </MainTabPanel>
      </div>
    );
}

const Home = (props) => {
    const data = {
        one: {
            name: "What is Income Jar?"
        },
        two: {
            name: "Legal Stuff"
        },
        three: {
            name: "Benefits"
        },
        four: {
            name: "Security"
        },
        five: {
            name: "Safety"
        },
        six: {
            name: "FAQ"
        },
        seven: {
            name: "Streams"
        }
    }

    return (
        <React.Fragment>
            <ScrollableTabsButtonAuto data={data} />           
        </React.Fragment>
    )
}

export default Home;