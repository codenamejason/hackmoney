pragma solidity  >=0.4.22 <0.7.0;

//import "../token/erc777/StreamToken.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

/**
 * @title StreamTokenReceiver
 * @dev Very simple ERC777 Recipient
 */
contract StreamTokenReceiver is IERC777Recipient {

    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("StreamTokenReceiver");

    IERC777 private _token;

    event DoneStuff(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    constructor (address token) public {
        _token = IERC777(token);

        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {
        require(msg.sender == address(_token), "StreamTokenReceiver: Invalid token");

        // do stuff
        



        emit DoneStuff(operator, from, to, amount, userData, operatorData);
    }
}
//import { StreamTokenSender } from "./StreamTokenSender.sol";
//import { StreamTokenReceiver } from "./StreamTokenReceiver.sol";
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



interface IUniswapFactory {
    function createExchange(address token) external returns (address exchange);
    function getExchange(address token) external view returns (address exchange);
    function getToken(address exchange) external view returns (address token);
    function getTokenWithId(uint256 tokenId) external view returns (address token);
    function initializeFactory(address template) external;
}



interface ERC20 {
    function totalSupply() external view returns (uint supply);
    function balanceOf(address _owner) external view returns (uint balance);
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint remaining);
    function decimals() external view returns(uint digits);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
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


contract StreamToken is ERC777 {
    //uint256 public totalSupply;

    constructor() public
        ERC777("Stream Token", "iNETs", new address[](0))
    {
        send(0xd2cCea05436bf27aE49B01726075449F815B683e, 10000 * 10 ** 18, "Initial Supply Tx");
    }
}


/**
*   @dev IncomeStreamCreator contract
*/
contract IncomeStreamCreator is StreamToken {
    // State variables
    address payable public owner;
    address public streamTokenReceiverAddress;
    uint256 public priceToRegister = .25 ether;
    bytes32 constant MEMBER_HASH = keccak256("iNET_MEMBER");

    //uint256 constant

    bytes public userData;
    bytes public operatorData;
    enum Statuses { VACANT, OCCUPIED, DEFAULT, PAID, NOT_PAID, EXPIRED, NEW }
    Statuses currentStatus;
    
    mapping(address => bool) registeredAddresses;
    mapping(address => Member) memberInfoArray;

    Member public member;

    struct Member {
        address payable id;
        uint256[] tokens;
    }
    
    // Events
    event StreamCreated(
        address _streamOwnerId,
        uint256 _streamAmount,
        uint256 _streamLength,
        uint256 _streamPayment,
        uint256 _streamFrequency
    );
    
    event Test (
        string message,
        uint256 id,
        string source
    );
    
    // Constructor
    constructor() public {
        owner = msg.sender;
        
        // defalult status on deploy
        currentStatus = Statuses.DEFAULT;
        
    }
    
    // Modifiers
    
    modifier onlyWhileDefault {
        require(currentStatus == Statuses.DEFAULT, "Not Available.");
        _;
    }
    
    
    modifier onlyWhileOwner {
        require(msg.sender == owner, 'You need to be the owner.');
        _;
    }
    
    
    modifier enoughEther (uint256 _amount) {
        require(msg.value >= _amount, 'Not enough ether providedd.');
        _;
    }
    
    
    
    function createStream(
        uint256 _amount,
        uint256 _duration,
        uint256 _frequency,
        uint256 _payment,
        address  _owner,
        address[] memory _defalultOperators
    ) payable public onlyWhileDefault enoughEther(.01 ether){ // test amount
        if(_owner != msg.sender) {
            // assign to _defalultOperators
            
            
        } else {
            // set msg.sender to _owner
            _owner = msg.sender;
        }
        
        
        // Set the status to NEW stream
        currentStatus = Statuses.NEW;
        
        // send the ether to the owner
        owner.transfer(msg.value);
        
        
        // Send the stream token(s)
        
        
        emit StreamCreated(_owner, _amount, _duration, _payment, _frequency);
    }
    
    
    function transferStream(address streamId, address payable newOwner) payable public {
        owner = newOwner;
        
        
        emit Test('', 0, 'transferStream');
    }
    
    
    function payStream(address streamId) payable public {
        
        
        emit Test('', 0, 'payStream');
    }
    
    
    //receive() external payable onlyWhileDefault enoughEther(.25 ether) {
        
        
        //emit Test('', 0, 'receiveStreamTokens');
    //}
    
    
}