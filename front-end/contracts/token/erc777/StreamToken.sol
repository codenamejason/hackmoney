pragma solidity  >=0.4.22 <0.7.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
//import { Ownable } from "openzeppelin-solidity/contracts/access/Ownable.sol";
//import { SafeMath } from "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Ownable {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "you must be owner");
        _;
    }
}

interface ERC777Token {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function granularity() external view returns (uint256);

    function defaultOperators() external view returns (address[] memory);
    function isOperatorFor(address operator, address tokenHolder) external view returns (bool);
    function authorizeOperator(address operator) external;
    function revokeOperator(address operator) external;

    function send(address to, uint256 amount, bytes calldata data) external;
    function operatorSend(
        address from,
        address to,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external;

    function burn(uint256 amount, bytes calldata data) external;
    function operatorBurn(address from, uint256 amount, bytes calldata data, bytes calldata operatorData) external;

    event Sent(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 amount,
        bytes data,
        bytes operatorData
    );
    event Minted(address indexed operator, address indexed to, uint256 amount, bytes data, bytes operatorData);
    event Burned(address indexed operator, address indexed from, uint256 amount, bytes data, bytes operatorData);
    event AuthorizedOperator(address indexed operator, address indexed tokenHolder);
    event RevokedOperator(address indexed operator, address indexed tokenHolder);
}



interface StreamTokenReceiver {
    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external;

    event DoneStuff(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);
}





contract StreamToken is ERC777 {
    constructor()
        public
        ERC777("Stream Token", "iNETs", new address[](100))
    {
        _mint(msg.sender, 10000 * 10 ** 18, "Initial Supply Tx", "Initial Supply Tx");
    }
}