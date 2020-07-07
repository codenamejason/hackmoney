pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JarSToken is ERC20 {
    string  public standard = "Income JAR Stream Token v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public addressBalanceTracker;
    mapping(address => mapping(address => uint256)) public allowanceTracker;

    constructor ()
        ERC20("JAR Stream Token v1", "JAR")
        public {
        _mint(msg.sender, 1000000000000000000000000); // -> 1 Million
    }
    
    modifier onlyOwner {
        require(msg.sender == 0xd2cCea05436bf27aE49B01726075449F815B683e, "Must be owner to use this");
        _;
    }
    
    // Any added funtionality ->
    function sendStreamTokensToNewStreamOwner(address _streamOwner, uint256 _amount)
        public
        onlyOwner
    {
        _mint(_streamOwner, _amount);
    }
    
    function sendTokensToPartner(address _to, uint256 _amount)
        public
        onlyOwner
    {
        _mint(_to, _amount);
    }
    
}