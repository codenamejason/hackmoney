pragma solidity ^0.6.8;

import "../token/erc20/JarToken.sol";

contract JarSwap {
    string public name = "JAR Token Exchange";
    //JARToken public token;
    uint public rate = 1;
    address private owner;

     event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner, 'you must be the owner');
        _;
    }

    constructor () public {
        //token = _token;
        owner = msg.sender;
    }

    // function mintTokens() public payable {
    //     // Calculate the number of tokens to buy
    //     uint tokenAmount = msg.value * rate;

    //     // Require that EthSwap has enough tokens
    //     require(token.balanceOf(address(this)) >= tokenAmount, '[ERROR]::NEED_MORE_ETHER');

    //     // Transfer tokens to the user
    //     token.transfer(msg.sender, tokenAmount);

    //     // Emit an event
    //     emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    // }

    // function burnTokens(uint _amount) public onlyOwner {
    //     // User can't sell more tokens than they have
    //     require(token.balanceOf(msg.sender) >= _amount, '[ERROR]::NOT_ENOUGH_TO_SELL');

    //     // Calculate the amount of Ether to redeem
    //     uint etherAmount = _amount / rate;

    //     // Require that EthSwap has enough Ether
    //     require(address(this).balance >= etherAmount, '[ERROR]::EXCHANGE_NEEDS_MORE_ETHER');

    //     // Perform sale
    //     token.transferFrom(msg.sender, address(this), _amount);
    //     msg.sender.transfer(etherAmount);

    //     // Emit an event
    //     emit TokensSold(msg.sender, address(token), _amount, rate);
    // }


}