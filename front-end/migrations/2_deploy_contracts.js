const StreamToken = artifacts.require('StreamToken')
const iNETToken = artifacts.require('iNETToken')
//const FlashLoan = artifacts.require('FlashLoan')

module.exports = async function (deployer, network, accounts) {

    if (network == "live") {
        // Do something specific to the network named "live".
        
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