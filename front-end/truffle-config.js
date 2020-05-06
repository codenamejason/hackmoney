require('babel-register');
require('babel-polyfill');

// Locan Ganache Mnemonic
const mnemonic = 'outside bridge shrimp above piece myth acquire doll void filter fit reject';

//require('dotenv').config();
// const mnemonic = process.env.MNEMONIC;
// const HDWalletProvider = require("truffle-hdwallet-provider");
// // // Create your own key for Production environments (https://infura.io/)
// const INFURA_ID = process.env.INFURA_ID || 'e8cc7c8e245b46b482873ce9382a542b';

// const configNetwok = (network, networkId, path = "m/44'/60'/0'/0/", gas = 4465030, gasPrice = 1e10) => ({
//   provider: () => new HDWalletProvider(
//     mnemonic, `https://${network}.infura.io/v3/${INFURA_ID}`, 
//         0, 1, true, path
//     ),
//   networkId,
//   gas,
//   gasPrice
// });

module.exports = {
  networks: {
    development: {
      mnemonic: mnemonic,
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545,
      network_id: 20,
      accounts: 5,
      defaultEtherBalance: 500,
      blockTime: 3
    }
    // ropsten: configNetwok('ropsten', 3),
    // kovan: configNetwok('kovan', 42),
    // rinkeby: configNetwok('rinkeby', 4),
    // main: configNetwok('mainnet', 1),
  },
  mocha: {
    useColors: true,
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  migrations_directory: './migratons/',
  compilers: {
    solc: {
      version: '0.6.2',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
