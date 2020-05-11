import React from 'react';
import Container from '@material-ui/core/Container';
import './App.css';
import AppBar from './components/AppBar/index';
import Home from './components/Home/index';
//import { Drizzle } from 'dirzzle';
import web3 from 'web3';
//import SetProtocol from 'setprotocol.js';
// import contract(s) for drizzle or whatever...
import IncomeStreamCreator from "./abis/IncomeStreamCreator.json";

const options = {
    contracts: [
        IncomeStreamCreator
    ]
}

// Kovan Network config for Set Protocol
const config = {
    coreAddress: '0x3ee64Fe0b9246Ae52845F01A79c4b3A6D252289a',
    exchangeIssuanceModuleAddress: '0x887E45236B280B33C743075ac11dD69E3c581697',
    kyberNetworkWrapperAddress: '0x4093415A2eA915EaacF44Ac08A42434aE6A9d4e5',
    prtocolViewerAddress: '0x5754FA9d232812F817F5Ca58152Ad1E991e916dD',
    rebalancingAuctionModuleAddress: '0xeA510E982c92620A19475F8Dc777bAaa3c2A00F5',
    rebalancingSetExchangeIssuanceModule: '0xC2eF8799315E08f4ee08eA29913D2e51dba5aB78',
    rebalancingSetIssuanceModule: '0x91E1489D04054Ae552a369504F94E0236909c53c',
    rebalancingSetTokenFactoryAddress: '0xdc5B19c7085eBEE3AF84cf30418c0ECa11Ed1933',
    setTokenFactoryAddress: '0x952F78C33D3fb884C00b22e69B9119cd70582F80',
    transferProxyAddress: '0x61d264865756751392C0f00357Cc26ea70D98E3B',
    vaultAddress: '0x45Ab785b6c04f11b5e49B03d60f3642A8Ffe9246',
    wrappedEtherAddress: '0x8a18c7034aCEfD1748199a58683Ee5F22e2d4e45',
}

// Mainnet config for Set Protocol
const configMainnet = {
    coreAddress: '0xf55186CC537E7067EA616F2aaE007b4427a120C8',
    exchangeIssuanceModuleAddress: '0x73dF03B5436C84Cf9d5A758fb756928DCEAf19d7',
    kyberNetworkWrapperAddress: '0x9B3Eb3B22DC2C29e878d7766276a86A8395fB56d',
    prtocolViewerAddress: '0x589d4b4d311EFaAc93f0032238BecD6f4D397b0f',
    rebalancingAuctionModuleAddress: '0xe23FB31dD2edacEbF7d92720358bB92445F47fDB',
    rebalancingSetExchangeIssuanceModule: '0xd4240987D6F92B06c8B5068B1E4006A97c47392b',
    rebalancingSetIssuanceModule: '0xcEDA8318522D348f1d1aca48B24629b8FbF09020',
    rebalancingSetTokenFactoryAddress: '0x15518Cdd49d83471e9f85cdCFBD72c8e2a78dDE2',
    setTokenFactoryAddress: '0xE1Cd722575801fE92EEef2CA23396557F7E3B967',
    transferProxyAddress: '0x882d80D3a191859d64477eb78Cca46599307ec1C',
    vaultAddress: '0x5B67871C3a857dE81A1ca0f9F7945e5670D986Dc',
    wrappedEtherAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
}

const ethers = require('ethers');

let address = '0x51Caa385AB6363F6dF543BaEbe9501F057A8638e'

let provider = new ethers.getDefaultProvider('ropsten')
console.log(provider)
//.providers.Web3Provider(web3.currentProvider);
provider.getBalance(address).then((balance) => {

    // balance is a BigNumber (in wei); format is as a sting (in ether)
    let etherString = ethers.utils.formatEther(balance);

    console.log("Balance: " + etherString);
});

provider.getTransactionCount(address).then((transactionCount) => {
    console.log("Total Transactions Ever Sent: " + transactionCount);
});

provider.getBlockNumber().then((blockNumber) => {
    console.log("Current block number: " + blockNumber);
});

provider.getGasPrice().then((gasPrice) => {
    // gasPrice is a BigNumber; convert it to a decimal string
    let gasPriceString = gasPrice.toString();

    console.log("Current gas price: " + gasPriceString);
});

// Block Number
provider.getBlock(3346773).then((block) => {
    console.log(block);
});

// Block Hash
let blockHash = "0x7a1d0b010393c8d850200d0ec1e27c0c8a295366247b1bd6124d496cf59182ad";
provider.getBlock(blockHash).then((block) => {
    console.log(block);
});

// See: https://ropsten.etherscan.io/tx/0xa4ddad980075786c204b45ab8193e543aec4411bd94894abef47dc90d4d3cc01

let transactionHash = "0xa4ddad980075786c204b45ab8193e543aec4411bd94894abef47dc90d4d3cc01"

provider.getTransaction(transactionHash).then((transaction) => {
    console.log(transaction);
});

provider.getTransactionReceipt(transactionHash).then((receipt) => {
    console.log(receipt);
});

// provider.resolveName("registrar.firefly.eth").then(function(address) {
//     console.log("Address: " + address);
//     // "0x6fC21092DA55B392b045eD78F4732bff3C580e2c"
// });

// address = "0x6fC21092DA55B392b045eD78F4732bff3C580e2c";
// provider.lookupAddress(address).then(function(address) {
//     console.log("Name: " + address);
//     // "registrar.firefly.eth"
// });



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
