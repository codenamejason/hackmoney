pragma solidity  >=0.4.22 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract iNETToken is ERC20 {
    address[] public defaultOperators;



    constructor() public ERC20("iNET Token", "iNET") {
        // 1 Billion Tokens minted at creation
        _mint(msg.sender, 1000000000000000000000000000);
        //totalSupply += 1000000000000000000000000000;
        //balances[msg.sender] += 250000000000000000000000000;
    }



}