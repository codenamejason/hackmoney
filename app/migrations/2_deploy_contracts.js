const Token = artifacts.require('Token')
const ChainlinkEtherPrice = artifacts.require('ChainlinkGetEtherPrice')

module.exports = async function (deployer) {
    /**
     * @dev deployments
     */
    await deployer.deploy(Token)
    const token = await Token.deployed()

    
    await deployer.deploy(ChainlinkEtherPrice, '0xc99B3D447826532722E41bc36e644ba3479E4365')
    const getEtherPrice = await ChainlinkEtherPrice.deployed()


}