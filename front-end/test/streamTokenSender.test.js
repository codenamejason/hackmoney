const { singletons, BN, expectEvent } = require('@openzeppelin/test-helpers');

const StreamToken = artifacts.require('StreamToken');
const StreamTokenSender = artifacts.require('StreamTokenSender');

contract('StreamTokenSender', function ([_, registryFunder, creator, holder, recipient]) {
  const data = web3.utils.sha3('TestData');

  beforeEach(async function () {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await StreamToken.new({ from: creator });
    const amount = new BN(10000);
    await this.token.send(holder, amount, data, { from: creator });
    this.sender = await StreamTokenSender.new({ from: creator });
  });

  it('sends from an externally-owned account', async function () {
    const amount = new BN(1000);
    const tokensSenderInterfaceHash = await this.sender.TOKENS_SENDER_INTERFACE_HASH();

    await this.sender.senderFor(holder);
    await this.erc1820.setInterfaceImplementer(holder, tokensSenderInterfaceHash, this.sender.address, { from: holder });

    const receipt = await this.token.send(recipient, amount, data, { from: holder });
    await expectEvent.inTransaction(receipt.tx, StreamTokenSender, 'DoneStuff', { from: holder, to: recipient, amount: amount, userData: data, operatorData: null });

    const recipientBalance = await this.token.balanceOf(recipient);
    recipientBalance.should.be.bignumber.equal(amount);
  });
});