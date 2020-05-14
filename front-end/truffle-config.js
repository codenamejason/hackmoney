require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

// Locan Ganache Mnemonic
const mnemonic = 'evoke club entry catalog unveil truly run lyrics melt property main noise'; // funded accounts[0]
const maintest = 'gap cage shrug cake general simple cable air raw vessel dignity reduce'; // funded accounts[0]
const ganache = 'outside bridge shrimp above piece myth acquire doll void filter fit reject';
const rop = 'process eternal ill spawn purpose replace solve humble mimic nothing element portion';

//'outside bridge shrimp above piece myth acquire doll void filter fit reject';

// Infura MainNet
//https://mainnet.infura.io/v3/1ad03ac212da4523b6c8337eace81a14
//ganache-cli --fork https://mainnet.infura.io/v3/1ad03ac212da4523b6c8337eace81a14 -i 1

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
      mnemonic: ganache,
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
    },
    kovan: {
	    provider: new HDWalletProvider(ganache, "https://kovan.infura.io/v3/1ad03ac212da4523b6c8337eace81a14"),
	    network_id: 42,
	    gas: 5000000,
		gasPrice: 5000000000, // 5 Gwei
		skipDryRun: true
	  },
    ropsten: {
      provider: () => new HDWalletProvider(
        rop,
        "https://ropsten.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b"
      ),
      network_id: 3,
      gas: 5000000,
      gasPrice: 5000000000 // 5 Gwei
    },
    main: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://mainnet.infura.io/v3/1ad03ac212da4523b6c8337eace81a14",
      ),
      network_id: 5,
      gas: 4700000
    },
    kovan: {
	    provider: new HDWalletProvider(rop, "https://kovan.infura.io/v3/4a3706ac2ddf434fbc3ca2e68a746382"),
	    network_id: 42,
	    gas: 5000000,
      gasPrice: 5000000000, // 5 Gwei
      skipDryRun: true
	  },
    // ropsten: configNetwok('ropsten', 3),
    // kovan: configNetwok('kovan', 42),
    // rinkeby: configNetwok('rinkeby', 4),
    // main: configNetwok('mainnet', 1),
  },
  mocha: {
    useColors: true,
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  migrations_directory: './src/migratons/',
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
