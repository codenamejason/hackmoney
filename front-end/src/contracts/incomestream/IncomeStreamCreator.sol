pragma solidity  >=0.4.22 <0.7.0;

import '../token/erc777/StreamToken.sol';

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