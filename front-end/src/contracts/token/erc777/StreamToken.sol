pragma solidity  >=0.4.22 <0.7.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract StreamToken is ERC777 {
    constructor() public
        ERC777("Stream Token", "iNETs", new address[](0))
    {
        send(msg.sender, 10000 * 10 ** 18, "Initial Supply Tx");
    }
}