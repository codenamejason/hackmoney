/**
*
*
**/
pragma solidity  >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

/**
**      @dev Ownable contract
**/
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



// interface IWETH {
//   function deposit() external payable;
//   function withdraw(uint wad) external;
//   function totalSupply() external view returns (uint);
//   function approve(address guy, uint wad) external returns (bool);
//   function transfer(address dst, uint wad) external returns (bool);
//   function transferFrom(address src, address dst, uint wad) external returns (bool);
//   function () external payable;
// }


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





/**
*   @dev IncomeStreamCreator contract
*/
contract IncomeStreamCreator {
    // State variables
    address payable public owner;
    address public streamTokenReceiverAddress;
    uint256 public priceToRegister = .25 ether;
    bytes32 constant MEMBER_HASH = keccak256("iNET_MEMBER");

    //uint256 constant

    bytes public userData;
    bytes public operatorData;
    enum Statuses { DEFAULT, PAID, NOT_PAID, EXPIRED, NEW }
    Statuses currentStatus;
    
    mapping(address => bool) registeredAddresses;
    mapping(address => Member) memberInfoArray;

    Member public member;

    struct Member {
        address payable id;
        uint256[] tokens;
    }

    struct IncomeStream{
        address payable streamId;
        address payable owner;
        uint256 depositAmount;
        uint256 paymentAmount;
        uint256 duration;
        uint256 frequency;
        uint256 interestRate;
        uint256 deferrementLength;
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
    ) payable public onlyWhileDefault enoughEther(.01 ether){
        if(_owner != msg.sender) {
            // assign to _defalultOperators
            //_defaultOperators.push(msg.sender);
            
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