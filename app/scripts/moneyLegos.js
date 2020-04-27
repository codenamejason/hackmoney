//import { legos } from '@studydefi/money-legos';
//import uniswap from "@studydefi/money-legos/uniswap"
const { ethers } = require("ethers");
const { getLegosFor, networks } = require("@studydefi/money-legos");
console.log(networks);
// protocols
//legos.uniswap.factory.abi;
//legos.uniswap.factory.address;

// erc20 tokens
//legos.erc20.abi;
//legos.erc20.address;

// import only the protocol your interested in...(uniswap)
//uniswap.factory.abi;
//uniswap.factory.address;

const { Legos } = require("@studyDefi/money-legos");
const legos = getLegosFor(networks);

const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL || 'https://ropsten.infura.io/v3/1ad03ac212da4523b6c8337eace81a14' //"http://localhost:8545"
);

const wallet = new ethers.Wallet(
  "d1d9ddb7cf8785a02e6910d7bee836be60cc5452c54a16bb09178ecf54cd25c6", // Default private key for ganache-cli -d
  provider
);

const newExchangeContract = (address) =>
  new ethers.Contract(address, legos.uniswap.contracts.exchange.abi, wallet);

const newTokenContract = (address) =>
  new ethers.Contract(address, legos.erc20.contracts.abi, wallet);

const uniswapFactory = new ethers.Contract(
  legos.uniswap.contracts.factory.address,
  legos.uniswap.contracts.factory.abi,
  wallet
);

const swapOnUniswap = async (fromAddress, toAddress, fromAmountWei) => {
  // Don't swap
  if (fromAddress === toAddress) {
    return fromAmountWei;
  }

  // Min value of tokens to receive
  const minTokensReceived = 1;
  const minEthReceived = 1;

  // Random time in 2050
  const deadline = 2525644800;

  const toExchangeAddress = await uniswapFactory.getExchange(toAddress);
  const toExchangeContract = newExchangeContract(toExchangeAddress);

  // ETH -> Token
  if (fromAddress === legos.erc20.contracts.eth.address) {
    return toExchangeContract.ethToTokenSwapInput(minTokensReceived, deadline, {
      gasLimit: 4000000,
      value: fromAmountWei,
    });
  }

  // ERC20 contract
  const fromTokenContract = newTokenContract(fromAddress);

  // Uniswap Exchange contract
  const fromExchangeAddress = await uniswapFactory.getExchange(fromAddress);
  const fromExchangeContract = newExchangeContract(fromExchangeAddress);

  // Need to approve transferFrom
  await fromTokenContract.approve(fromExchangeAddress, fromAmountWei);

  // Token -> ETH
  if (toAddress === legos.erc20.contracts.eth.address) {
    return fromExchangeContract.tokenToEthSwapInput(fromAmountWei, 1, deadline);
  }

  // Token -> Token
  return fromExchangeContract.tokenToTokenSwapInput(
    fromAmountWei,
    minTokensReceived,
    minEthReceived,
    deadline,
    toAddress,
    {
      gasLimit: 4000000,
    }
  );
};

const swapAndLog = async (fromToken, toToken, amount) => {
  console.log(`Swapping ${amount} ${fromToken.symbol} to ${toToken.symbol}`);

  await swapOnUniswap(
    fromToken.address,
    toToken.address,
    ethers.utils.parseUnits(amount.toString(), fromToken.decimals)
  );

  if (toToken === legos.erc20.contracts.eth) {
    const ethBalWei = await wallet.getBalance();
    console.log(
      `${toToken.symbol} balance: ${ethers.utils.formatEther(ethBalWei)}`
    );
    return;
  }

  const repBal = await newTokenContract(toToken.address).balanceOf(
    wallet.address
  );
  console.log(
    `New ${toToken.symbol} balance: ${ethers.utils.formatUnits(
      repBal,
      toToken.decimals
    )}`
  );
};

const main = async () => {
  await swapAndLog(legos.erc20.contracts.eth, legos.erc20.contracts.dai, 1);
  await swapAndLog(legos.erc20.contracts.dai, legos.erc20.contracts.rep, 50);
  await swapAndLog(legos.erc20.contracts.rep, legos.erc20.contracts.eth, 2);
};

main();