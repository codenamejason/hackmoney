pragma solidity ^0.5.15;

import "@studydefi/money-legos/onesplit/contracts/IOneSplit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Token {










}

contract OneSplitSwapper {
    // Uniswap Ropsten factory address
    address constant OneSplitAddress = 0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351;

    function _swap(address from, address to, uint256 amountWei) internal {
        IERC20 fromIERC20 = IERC20(from);
        IERC20 toIERC20 = IERC20(to);

        (uint256 returnAmount, uint256[] memory distribution) = IOneSplit(
            OneSplitAddress
        ).getExpectedReturn(
            fromIERC20,
            toIERC20,
            amountWei,
            10,
            0
        );

        IOneSplit(OneSplitAddress).swap(
            fromIERC20,
            toIERC20,
            amountWei,
            returnAmount,
            distribution,
            0
        );
    }
}