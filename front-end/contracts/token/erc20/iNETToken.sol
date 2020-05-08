pragma solidity  >=0.4.22 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract iNETToken {
    address[] public defaultOperators;

    function mintMinerReward() public {
        //_mint(block.coinbase, 1000);
    }

    constructor() public {
        // 1 Billion Tokens minted at creation
        //_mint(msg.sender, 1000000000000000000000000000);
    }



}