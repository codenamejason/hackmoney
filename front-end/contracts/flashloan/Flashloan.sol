pragma solidity >=0.4.22 <0.7.0;

// //import "https://github.com/mrdavey/ez-flashloan/blob/remix/contracts/aave/FlashLoanReceiverBase.sol";

// // The following is the mainnet address for the LendingPoolAddressProvider. 
// // Get the correct address for your network from: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
// contract Flashloan is FlashLoanReceiverBase(address(0x24a42fD28C976A61Df5D00D0599C34c4f90748c8)) {
//     bool failExecution = false;
//     uint amountOfLoan = 10 * 1e18; // 10 Dai
    
//     /**
//     * Events
//     */
//     event ExecutedWithFail(
//         address _reserve,
//         uint256 _amount,
//         uint256 _fee
//     );
    
//     event ExecutedWithSuccess(
//         address _reserve,
//         uint256 _amount,
//         uint256 _fee
//     );    
    
//     /**
//     * Functions
//     */

//     /**
//     *   @dev deposit
//     */
//     function deposit() public payable {
        
//     }
    
//     /*
//     *   @dev executeOperation
//     */
//     function executeOperation(
//         address _reserve,
//         uint256 _amount,
//         uint256 _fee,
//         bytes calldata _params
//     ) external
//     {
//         require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");

//         //
//         // do your thing here
//         //
//         bytes memory data = _params;
        
//         // buy from exchange and
        
        
//         // Sell to Exchange buy
        
        
        
        
//         if(failExecution) {
//             emit ExecutedWithFail(_reserve, _amount, _fee);
//             return;
//         }
//         //execution does not fail - mint tokens and return them to the _destination
//         //note: if the reserve is eth, the mock contract must receive at least _fee ETH before calling executeOperation

//         if(_reserve != EthAddressLib.ethAddress()) {
//            // token.mint(_fee);
//         }
//         // Time to transfer the funds back
//         uint totalDebt = _amount.add(_fee);
//         transferFundsBackToPoolInternal(_reserve, totalDebt);
//     }
    
    
//     function flashloan() public onlyOwner {
//         bytes memory data = "";
//         uint amount = 1;
//         // mainnet DAI, for more asset addresses, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
//         address asset = address(0x6B175474E89094C44Da98b954EedeAC495271d0F); 
        
//         ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
//         lendingPool.flashLoan(address(this), asset, amount, data);
//     }
    
//     modifier onlyOwner() {
//         require(msg.sender == 0xd2cCea05436bf27aE49B01726075449F815B683e);
//         _;
//     }
    
//     constructor () public {
        
//     }
    
//     /*
//     * @ToDo: Finish this
//     */
//     function buyDai() public payable returns(uint256) {
//         address daiAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

//         //UniswapExchangeInterface usi = UniswapExchangeInterface(daiAddress);

//         uint256 amountEth = msg.value;

//         uint256 amountBack = 1;//usi.ethToTokenSwapInput.value(amountEth)(1, block.timestamp);

//         ERC20 daiToken = ERC20(daiAddress);
//         daiToken.transfer(msg.sender, amountBack);
        
//         emit ExecutedWithSuccess(daiAddress, amountEth, (.01 * 1e18));
        
//         return amountBack;
//     }
    
//     /*
//     * @ToDo: Finish this
//     */
//     function sellDai() public payable returns(uint256) {
//         address daiAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

//         //UniswapExchangeInterface usi = UniswapExchangeInterface(daiAddress);

//         uint256 amountEth = msg.value;

//         uint256 amountBack = 10; // usi.ethToTokenSwapInput.value(amountEth)(1, block.timestamp);
//         ERC20 daiToken = ERC20(daiAddress);
//         daiToken.transfer(msg.sender, amountBack);
        
//         emit ExecutedWithSuccess(daiAddress, amountEth, (.01 * 1e18));

//         return amountBack;
//     }
    
// }

// interface ILendingPool {
//   function addressesProvider () external view returns ( address );
//   function deposit ( address _reserve, uint256 _amount, uint16 _referralCode ) external payable;
//   function redeemUnderlying ( address _reserve, address _user, uint256 _amount ) external;
//   function borrow ( address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode ) external;
//   function repay ( address _reserve, uint256 _amount, address _onBehalfOf ) external payable;
//   function swapBorrowRateMode ( address _reserve ) external;
//   function rebalanceFixedBorrowRate ( address _reserve, address _user ) external;
//   function setUserUseReserveAsCollateral ( address _reserve, bool _useAsCollateral ) external;
//   function liquidationCall ( address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken ) external payable;
//   function flashLoan ( address _receiver, address _reserve, uint256 _amount, bytes calldata _params ) external;
//   function getReserveConfigurationData ( address _reserve ) external view returns ( uint256 ltv, uint256 liquidationThreshold, uint256 liquidationDiscount, address interestRateStrategyAddress, bool usageAsCollateralEnabled, bool borrowingEnabled, bool fixedBorrowRateEnabled, bool isActive );
//   function getReserveData ( address _reserve ) external view returns ( uint256 totalLiquidity, uint256 availableLiquidity, uint256 totalBorrowsFixed, uint256 totalBorrowsVariable, uint256 liquidityRate, uint256 variableBorrowRate, uint256 fixedBorrowRate, uint256 averageFixedBorrowRate, uint256 utilizationRate, uint256 liquidityIndex, uint256 variableBorrowIndex, address aTokenAddress, uint40 lastUpdateTimestamp );
//   function getUserAccountData ( address _user ) external view returns ( uint256 totalLiquidityETH, uint256 totalCollateralETH, uint256 totalBorrowsETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor );
//   function getUserReserveData ( address _reserve, address _user ) external view returns ( uint256 currentATokenBalance, uint256 currentUnderlyingBalance, uint256 currentBorrowBalance, uint256 principalBorrowBalance, uint256 borrowRateMode, uint256 borrowRate, uint256 liquidityRate, uint256 originationFee, uint256 variableBorrowIndex, uint256 lastUpdateTimestamp, bool usageAsCollateralEnabled );
//   function getReserves () external view;
// }

// /**
// @title ILendingPoolAddressesProvider interface
// @notice provides the interface to fetch the LendingPoolCore address
//  */

// contract ILendingPoolAddressesProvider {

//     function getLendingPool() public view returns (address);
//     function setLendingPoolImpl(address _pool) public;

//     function getLendingPoolCore() public view returns (address payable);
//     function setLendingPoolCoreImpl(address _lendingPoolCore) public;

//     function getLendingPoolConfigurator() public view returns (address);
//     function setLendingPoolConfiguratorImpl(address _configurator) public;

//     function getLendingPoolDataProvider() public view returns (address);
//     function setLendingPoolDataProviderImpl(address _provider) public;

//     function getLendingPoolParametersProvider() public view returns (address);
//     function setLendingPoolParametersProviderImpl(address _parametersProvider) public;

//     function getTokenDistributor() public view returns (address);
//     function setTokenDistributor(address _tokenDistributor) public;

//     function getFeeProvider() public view returns (address);
//     function setFeeProviderImpl(address _feeProvider) public;

//     function getLendingPoolLiquidationManager() public view returns (address);
//     function setLendingPoolLiquidationManager(address _manager) public;

//     function getLendingPoolManager() public view returns (address);
//     function setLendingPoolManager(address _lendingPoolManager) public;

//     function getPriceOracle() public view returns (address);
//     function setPriceOracle(address _priceOracle) public;

//     function getLendingRateOracle() public view returns (address);
//     function setLendingRateOracle(address _lendingRateOracle) public;

// }

// /**
// *    @dev Uniswap V2 Factory Interface
// */
// interface IUniswapV2Factory {
//   event PairCreated(address indexed token0, address indexed token1, address pair, uint);

//   function getPair(address tokenA, address tokenB) external view returns (address pair);
//   function allPairs(uint) external view returns (address pair);
//   function allPairsLength() external view returns (uint);

//   function feeTo() external view returns (address);
//   function feeToSetter() external view returns (address);

//   function createPair(address tokenA, address tokenB) external returns (address pair);
// }

// /**
// *    @dev Uniswap V2 Pair Interface
// */
// interface IUniswapV2Pair {
//   event Mint(address indexed sender, uint amount0, uint amount1);
//   event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
//   event Swap(
//     address indexed sender,
//     uint amount0In,
//     uint amount1In,
//     uint amount0Out,
//     uint amount1Out,
//     address indexed to
//   );
//   event Sync(uint112 reserve0, uint112 reserve1);

//   function MINIMUM_LIQUIDITY() external pure returns (uint);
//   function factory() external view returns (address);
//   function token0() external view returns (address);
//   function token1() external view returns (address);
//   function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
//   function price0CumulativeLast() external view returns (uint);
//   function price1CumulativeLast() external view returns (uint);
//   function kLast() external view returns (uint);

//   function mint(address to) external returns (uint liquidity);
//   function burn(address to) external returns (uint amount0, uint amount1);
//   function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
//   function skim(address to) external;
//   function sync() external;

//   function initialize(address, address) external;
// }



