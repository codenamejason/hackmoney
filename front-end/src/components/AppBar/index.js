import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Web3 from "web3";
import Onboard from 'bnc-onboard'
import { Paper, Grid, Button } from '@material-ui/core';

let web3

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
})

async function connectWallet() {
    await onboard.walletSelect();
    await onboard.walletCheck();    
}
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
                Income Stream
            </Typography>
             
            <Button onClick={connectWallet}>
                    Connect Wallet
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />      
    </React.Fragment>
  );
}