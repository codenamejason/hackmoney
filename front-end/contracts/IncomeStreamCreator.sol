pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract JarToken is ERC20 {
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

interface DateTimeAPI {
        /*
         *  Abstract contract for interfacing with the DateTime contract.
         *
         */
        function isLeapYear(uint16 year)external view returns (bool);
        function getYear(uint timestamp)external view returns (uint16);
        function getMonth(uint timestamp)external view returns (uint8);
        function getDay(uint timestamp)external view returns (uint8);
        function getHour(uint timestamp)external view returns (uint8);
        function getMinute(uint timestamp)external view returns (uint8);
        function getSecond(uint timestamp)external view returns (uint8);
        function getWeekday(uint timestamp)external view returns (uint8);
}


contract IncomeStreamCreator {
    // State variables
    address payable public owner = 0xd2cCea05436bf27aE49B01726075449F815B683e;
    address payable public streamOwner;
    uint256 public minWaitingPeriod = 29;
    uint256 public minDeposit = 99;
    uint256 public maxDeposit = 1001;
    uint256 public priceToRegister = .25 ether;
    bytes32 public MEMBER_HASH = keccak256("iNET_MEMBER_HASH");
    bytes32 public userData;
    
    JarToken token;
    
    struct Stream {
        uint256 streamId;
        address streamOwner;
        uint256 streamValue; // net present value coming soon!
        uint256 duration;
        uint256 frequency;
        uint256 payment;
        uint256 depositAmt;
        uint256 dateCreated;
    }
    
    struct Member {
        bytes32 email;
        uint256 balance;
        bool active;
    }
    
    Stream[] public streamsArray;
    address[] public streamAccounts;
    
    // counter
    uint256 streamCount;

    // mappings mapping(_KeyType => _ValueType)
    mapping(address => Stream) public streams;
    mapping(address => uint256) public streamBalances;
    

    // Events
    event StreamCreated(
        uint256 _streamId,
        address _streamOwner,
        uint256 _streamAmount,
        uint256 _streamLength,
        uint256 _streamPayment,
        uint256 _streamFrequency
    );

    event StreamTransferred(
        uint256 _streamId,
        address _owner,
        address _newOwner,
        bool _tokensTransferred
    );
    
    event TokensSent(
        address _owner,
        uint256 _amount
    );
    
    event WithdrawMade(
        uint256 _amount,
        address _user
    );
    
    // Constructor
    constructor() public 
    {
        // do stuff if we need to...
    }
    
    
    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the owner.");
        _;
    }

   function getStream(uint256 _streamId) public view returns(Stream memory) {
      return streamsArray[_streamId];
   }
   
   function getStreams(address _owner) public view returns(Stream memory) {
      return streams[_owner];
   }
   
   function getAllStreams() public view returns(address[] memory) {
       return streamAccounts;
   }
    
    function createStream(
        uint256 _amount,
        uint256 _duration,
        uint256 _frequency,
        uint256 _payment
    ) public payable {
        // make sure they are within our constraints
        require(_amount >= minDeposit, "Must be above 10 to participate.");
        require(_amount <= maxDeposit, "Must be below 1000 to participat.");
        // create a new entity/stream
        Stream memory stream;
        // set its params
        stream.streamId = streamCount++;
        stream.streamOwner = msg.sender; // -> the owner of the stream
        stream.streamValue = msg.value; // -> need to convert this do DAI
        stream.duration = _duration;
        stream.frequency = _frequency;
        stream.depositAmt = _amount;
        stream.dateCreated = block.timestamp;
        stream.payment = _payment;
        
        streamsArray.push(stream);
        streams[msg.sender] = stream;
        streamBalances[msg.sender] = stream.streamValue;

        
        // send the streams tokens to the owner
        token.sendStreamTokensToNewStreamOwner(msg.sender, (_payment * _frequency * _duration));
        
        
        // Notify of success
        emit StreamCreated(streamCount, msg.sender, _amount, _duration, _payment, _frequency);
        //return stream;
    }
    
    
    function sendOwnerStreamTokens(address payable _owner, uint256 _payment) internal {
        // send tokens representing the income stream to owner
        
        
        
        emit TokensSent(_owner, _payment);
    }
    
    
    function transferStream(uint256 _streamId, address _newOwner) public payable {
        require(_streamId >= 0, "Your id is not a positive integer.");
        require(_newOwner != msg.sender, "Cannot transfer to your self.");
        
        emit StreamTransferred(_streamId, msg.sender, _newOwner, true);
    }
 
    function withdraw(uint256 _amount) public payable onlyOwner returns(bool) {
        require(_amount < address(this).balance, "Not enough to withdraw.");
        owner.transfer(msg.value);
        return true;
    }
    
    
    function withdrawAll() public payable onlyOwner returns(bool) {
        owner.transfer(address(this).balance);
        emit WithdrawMade(msg.value, owner);
        return true;
    }
    
    
    function getBalanceContract() public view returns(uint256) {
        return address(this).balance;
    }
    
    
    receive() external payable onlyOwner {
        owner.transfer(address(this).balance);
    }
}