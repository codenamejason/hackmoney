pragma solidity  >=0.4.22 <0.7.0;

import '../token/erc777/StreamToken.sol';


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

/**
*   @dev IncomeStreamCreator contract
*/
contract IncomeStreamCreator is StreamToken, Ownable {
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
    modifier IsWallet(address _address) {
		/**
		* @dev Transfer tokens from msg.sender to another address.  
		* Cannot Allows execution if the transfer to address code size is 0
		* @param _address address to check that its not a contract
		*/		
		uint codeLength;
		assembly {
            // Retrieve the size of the code on target address, this needs assembly .
            codeLength := extcodesize(_address)
        }
		assert(codeLength==0);
        _;
    }

    

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
        
        // figure out how many tokens they need and what metadata to put
        // ex: JUN2020x150, JUL2020x150, etc.



        // send the iNETs tokens to the owner
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