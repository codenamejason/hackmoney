pragma solidity ^0.5.15;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract StreamToken is ERC777 {
    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    )
        ERC777("InsureNET Stream Token", "iNETs", defaultOperators)
        public
    {
        _mint(msg.sender, msg.sender, initialSupply, "", "");
    }
}