const StreamToken = artifacts.require('StreamToken')
const iNETToken = artifacts.require('iNETToken')
const Flashloan = artifacts.require('FlashLoan')
require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });
const { singletons } = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
    try {

        let lendingPoolAddressesProviderAddress;

        switch (network) {
            case "live":
                lendingPoolAddressesProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; 
                // Do something specific to the network named "live".
                await singletons.ERC1820Registry(accounts[0]);
                break;
            case "mainnet":
            case "mainnet-fork":
            case "development": // for Ganache mainnet forks
                lendingPoolAddressesProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; 
                break;
            case "ropsten":
            case "ropsten-fork":
                lendingPoolAddressesProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728";
                break;
            case "kovan":
            case "kovan-fork":
                lendingPoolAddressesProviderAddress = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5";
            default:
                throw Error(`Are you deploying to the current network? (network selected: ${network})`)                
        } 

        await deployer.deploy(Flashloan, lendingPoolAddressesProviderAddress)

    } catch (e) {
            console.log(`Error in migration: ${e.message}`)
    }

    /**
     * @dev deployments
     */
    // await deployer.deploy(StreamToken)
    // const streamToken = await StreamToken.deployed()
    // console.log(streamToken)

    // await deployer.deploy(iNETToken)
    // const iNetToken = await iNETToken.deployed()
    // console.log(iNetToken)

    //await deployer.deploy(FlashLoan)
    //const flashloan = await FlashLoan.deployed()
    


}