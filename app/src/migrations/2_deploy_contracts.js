const StreamToken = artifacts.require('StreamToken')
const FlashLoan = artifacts.require('FlashLoan')

module.exports = async function (deployer) {
    /**
     * @dev deployments
     */
    await deployer.deploy(StreamToken)
    const streamToken = await StreamToken.deployed()

    await deployer.deploy(FlashLoan)
    const flashloan = await FlashLoan.deployed()
    


}