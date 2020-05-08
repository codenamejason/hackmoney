import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Web3 from "web3";
import Onboard from 'bnc-onboard'
import { Toolbar, Paper, Grid, Box, Button } from '@material-ui/core';
import './App.css';
import AppBar from './components/AppBar/index';
import Home from './components/Home/index';

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

function App() {
  return (
        <React.Fragment>
            <Container className="App">
                <AppBar />
                <Home />    
            </Container>            
        </React.Fragment>
  );
}

export default App;
