import React from 'react';
import TabPanel from '../TabPanel/index';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box, Paper, Link } from '@material-ui/core';


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
    typography: {
        align: 'left',
        marginLeft: '20px',
        padding: '5px',
    }
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
            {/* <Tab label={data.five.name} {...a11yProps(4)} />
            <Tab label={data.six.name} {...a11yProps(5)} />
            <Tab label={data.seven.name} {...a11yProps(6)} /> */}
          </Tabs>
        </AppBar>
        <MainTabPanel value={value} index={0}>
            <Paper elevation={3}>
                <Typography paragraph variant="h4">What is Income Jar?</Typography>
                <Typography paragraph align='center'>
                    Income Jar gives you the ability to create an income stream from your DeFi assets.
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    You decide:
                    <ul>
                        <li>Amount you want to deposit</li>
                        <li>Length of the stream ( 1, 3 or 5 years)</li>
                        <li>Payment frequency (monthly, quarterly, or annually)</li>
                    </ul>
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    And we determine your regular payments.
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    You will be earning a return on your money that is generally higher than you
                    can with most traditional income generation products, and you will be doing so 
                    without having to manage your investment, or take on the investment risk.
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    <b>Example</b> - Deposit <b>1000 DAI</b> for <b>12</b> months, and receive <b>12</b> payments of <b>89 DAI</b> per month - a <b>6.8% rate of return</b>.
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    <i>You would receive <b>89 JAR Tokens</b> per month.  At the beginning of each month, each token will be redeemed for <b>1 DAI</b>.</i>
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    Why would you convert your assets into income?
                    <ul>
                        <li>You might prefer to not have to manage your money to receive a good rate of return</li>
                        <li>You don’t want to take the investment risk</li>
                        <li>You can create the income tokens, and send them to your kids in college...they can’t spend all your money at once</li>
                        <li>You can send them to your family back home</li>
                        <li>If investment rates go down, maybe you can sell your tokens for a profit</li>
                    </ul>
                </Typography>
                <Typography className={classes.typography} paragraph align='left'>
                    From our years in traditional financial services, we know that creating an income stream out of your assets can be very 
                    valuable in your financial planning process.  We wanted to bring that ability to DeFI
                </Typography>
                <Typography className={classes.typography} paragraph >
                    <b>Head over to the Streams tab to start your investment!</b>
                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={1}>
          <Paper elevation={3} >
              <Typography variant="h4">How it Works</Typography>              
              <Typography className={classes.typography} paragraph align='left'>
                    You determine your:
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    <ul>
                        <li>Deposit amount</li>
                        <li>Length of income - 1 | 3 | 5 years</li>
                        <li>Payment period - monthly | quarterly | annualy</li>
                    </ul>
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    You then find out the amount of your regular income payment
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    If you agree, you can connect your wallet, and begin the process.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    Once your deposit is made and the transaction is complete, you will receive your JAR tokens in your wallet.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    Each JAR token is denoted with a month and year.  At the beginning of each month, <b>you will receive 
                    1 DAI for every JAR token in your wallet</b>.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    <b>CAUTION:</b>  The process is <b>IRREVERSABLE</b>.  However, you can decide to sell your JAR tokens at a later time.
              </Typography>
              <Typography className={classes.typography} variant='h5' paragraph align='center'>
                    Why Create Income
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    We have decades of experience in the financial services world, and know that creating an income stream from your assets 
                    is a part of many financial plans.  Now that we can make those income streams into tokens, we have created even more 
                    reasons for an Income JAR.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    Maybe you have done well in an investment portfolio, and want to receive a steady income with a healthy return.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    You might be tired of managing all your own money, and want to move some of the responsibility and work to another party.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    You can create an income stream, and send the tokens to your family back home.  They won’t be able to spend it all at once
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    You can send the income tokens to your kids at college, so they can’t blow it all on one big party.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                    You can use it to make regular payments on your home, car, school, while earning a great rate of return.
              </Typography>
              <Typography className={classes.typography} paragraph align='left'>
                  Disclaimer:<br />
                  <p>Just About Right Holdings, LLC is an independent, self-funded company. We provide 
                  a client-side tool to create income streams using DeFi protocols.</p>
                  <p>We do not collect, hold, or store keys, account information, or the collection
                  of data, and do not use your data for marketing or advertising.
                  </p>                  
              </Typography>
          </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={2}>
            <Paper elevation={3}>
                <Typography variant="h4">Frequently Asked Questions</Typography>
                <Typography>
                    <ul style={{ listStyle: 'none' }}>
                        <li><b>Q. Do I need to fill out any information?</b></li>
                        <li><i>A. No.  You just need to connect an Ethereum wallet.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. What is minimum & maximum investment?</b></li>
                        <li><i>A. The minumum investment is $100 USD and maximum is $1000 USD.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Can I get my deposit back?</b></li>
                        <li><i>A. You cannot get your deposit back once you have approved the transaction.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q.Can I send the tokens to someone else?</b></li>
                        <li><i>A. You can.  Since they are ERC-20 tokens, you can send JAR tokens to any Ethereum wallet.  
                            You can send as many tokens as you would like.  The wallet that has the tokens around the 
                            first of the month will receive the DAI</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. What if I need the cash?</b></li>
                        <li><i>A. You have a couple options.  You can sell your income stream back to us for a small fee. You can 
                            also sell your income stream to another party, via a marketplace.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Can I sell the tokens?</b></li>
                        <li><i>A. Again, Yes.  We will create a marketplace for the JAR income tokens, and we hope others will offer the same.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Can I just sell a few?</b></li>
                        <li><i>A. Of course...you can sell all your tokens, or just a few.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Can I see my income stream after I’ve purchased my tokens?</b></li>
                        <li><i>A. You can.  Just come to our site and connect your wallet.  We will show you your income stream, and even 
                            a Net Present Value based on different rates of return.</i></li>
                        <li>&nbsp;</li>
                        <li><b>Q. Will the income be taxed?</b></li>
                        <li><i>A. That is a question that can only be answered adequately by an accountant in your country.</i></li>
                        <li>&nbsp;</li> 
                        <li><b>Q. How are you able to pay me that rate of return?</b></li>
                        <li><i>A. We are able to manage the funds efficiently based on the series of cash flows.  We use different investment protocols - lending,
                             staking, arbitrage - to get the desired return we need in order to pay out the outstanding tokens. We also use decentralized 
                             hedges to offset large losses in value, and can sustain volatility due to the series of cash outflows.</i></li>
                        <li>&nbsp;</li>.
                        <li><b>Q. How do you keep the funds safe?</b></li>
                        <li><i>A. We use a series of security measures like multi-sig wallets.  We also have our Smart Contracts audited regularly (audit reports available).
                            When we utilize protocols to invest, we place Nexus Mutual Smart Contract coverage on the funds. We also utilize decentralized hedges to attempt 
                            to offset large losses in value. </i></li>
                        <li>&nbsp;</li> 
                        {/* <li><b>Q. </b></li>
                        <li><i>A. </i></li>
                        <li>&nbsp;</li> */}
                        {/* <li><b>Q. Is my outlay of capital gains need taxes?</b></li>
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
                        <li>&nbsp;</li> */}
                    </ul>
                </Typography>
            </Paper>
        </MainTabPanel>
        <MainTabPanel value={value} index={3}>
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
            name: "How it Works"
        },
        three: {
            name: "FAQ"
        },
        four: {
            name: "Streams"
        }//,
        // five: {
        //     name: "Safety"
        // },
        // six: {
        //     name: "FAQ"
        // },
        // seven: {
        //     name: "Streams"
        // }
    }

    return (
        <React.Fragment>
            <ScrollableTabsButtonAuto data={data} />           
        </React.Fragment>
    )
}

export default Home;