const StreamToken = artifacts.require('StreamToken')
const iNETToken = artifacts.require('iNETToken')
//const FlashLoan = artifacts.require('FlashLoan')
require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });
const { singletons } = require('@openzeppelin/test-helpers');



module.exports = async function (deployer, network, accounts) {

    if (network == "development") {
        // Do something specific to the network named "live".
        await singletons.ERC1820Registry(accounts[0]);

    } else {
        // Perform a different step otherwise.

    }

    /**
     * @dev deployments
     */
    await deployer.deploy(StreamToken)
    const streamToken = await StreamToken.deployed()
    console.log(streamToken)

    await deployer.deploy(iNETToken)
    const iNetToken = await iNETToken.deployed()
    console.log(iNetToken)

    //await deployer.deploy(FlashLoan)
    //const flashloan = await FlashLoan.deployed()
    


}