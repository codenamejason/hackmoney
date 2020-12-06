pragma solidity >=0.4.22 <0.7.0;

import "./aave/FlashLoanReceiverBase.sol";
import "./aave/ILendingPoolAddressesProvider.sol";
import "./aave/ILendingPool.sol";

contract Flashloan is FlashLoanReceiverBase {

    struct MyCustomData {
        address a;
        uint b;
    }

    constructor(address _addressProvider) FlashLoanReceiverBase(_addressProvider) public {}

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
        override
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        //MyCustomData memory myCustomData = abi.decode(_params, (MyCustomData));
        //
        // Your logic goes here.
        // !! Ensure that *this contract* has enough of `_reserve` funds to payback the `_fee` !!
        //
        revert("Hello, you haven't implemented your flashloan logic");
        // Pay back the loan plus the fee
        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }

    /**
        Flash loan 1000000000000000000 wei (1 ether) worth of `_asset`
     */
    //  function initateFlashLoan(
    //     address contractWithFlashLoan,
    //     address assetToFlashLoan,
    //     uint amountToLoan,
    //     bytes calldata _params
    // ) external {
    //     // Get Aave lending pool
    //     ILendingPool lendingPool = ILendingPool(
    //         ILendingPoolAddressesProvider(AaveLendingPoolAddressProviderAddress)
    //             .getLendingPool()
    //     );

    //     // Ask for a flashloan
    //     // LendingPool will now execute the `executeOperation` function above
    //     lendingPool.flashLoan(
    //         contractWithFlashLoan, // Which address to callback into, alternatively: address(this)
    //         assetToFlashLoan,
    //         amountToLoan,
    //         _params
    //     );
    // }


    function flashloan(address _asset) public onlyOwner {
        //address receiver = address(this); // Can also be a separate contract
        //address asset = 0x6b175474e89094c44da98b954eedeac495271d0f; // Dai
        uint amount = 100 * 1e18; // 100 DAI
        bytes memory params = "";

        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        lendingPool.flashLoan(address(this), _asset, amount, params);
    }
}
