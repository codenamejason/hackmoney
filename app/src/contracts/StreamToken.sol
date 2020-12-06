pragma solidity ^0.5.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StreamToken {
    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    )
        //ERC777("InsureNET Stream Token", "iNETs", defaultOperators)
        public
    {
        //_mint(msg.sender, msg.sender, initialSupply, "", "");
    }
}