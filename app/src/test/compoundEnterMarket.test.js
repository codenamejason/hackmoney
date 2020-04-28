const compound = require("@studyDefi/money-legos/compound");
require('chai')
  .use(require('chai-as-promised'))
  .should()

test("enter markets", async () => {
    const comptroller = new ethers.Contract(
      compound.comptroller.address,
      compound.comptroller.abi,
      wallet,
    );

    describe('comptroller', () => {
      it('enters markets successfully', async () => {
        assert.notEqual(wallet, 0x0)
      })
    })
    
    const before = await comptroller.getAssetsIn(wallet.address);
  
    const { cEther, cDAI } = compound;
    await comptroller.enterMarkets([cEther.address, cDAI.address]);
  
    const after = await comptroller.getAssetsIn(wallet.address);
  
    expect(before).toEqual([]);
    expect(after).toEqual([cEther.address, cDAI.address]);
});

test("supply 10 ETH (i.e. mint cETH)", async () => {
    const cEtherContract = new ethers.Contract(
      compound.cEther.address,
      compound.cEther.abi,
      wallet,
    );
  
    const before = await cEtherContract.balanceOf(wallet.address);
    const cEthBefore = parseFloat(fromWei(before, 8));
  
    // we supply ETH by minting cETH
    await cEtherContract.mint({
      gasLimit: 1500000,
      value: ethers.utils.parseEther("10"),
    });
  
    const after = await cEtherContract.balanceOf(wallet.address);
    const cEthAfter = parseFloat(fromWei(after, 8));
  
    expect(cEthBefore).toBe(0);
    expect(cEthAfter).toBeGreaterThan(0);
});

test("borrow 20 DAI", async () => {
    const cDaiContract = new ethers.Contract(
      compound.cDAI.address,
      compound.cDAI.abi,
      wallet,
    );
  
    const before = await daiContract.balanceOf(wallet.address);
  
    await cDaiContract.borrow(
      ethers.utils.parseUnits("20", erc20.dai.decimals),
      { gasLimit: 1500000 },
    );
  
    const after = await daiContract.balanceOf(wallet.address);
  
    const daiGained = parseFloat(fromWei(after.sub(before)));
    expect(daiGained).toBe(20);
});