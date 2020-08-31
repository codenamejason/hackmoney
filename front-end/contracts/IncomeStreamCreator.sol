pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;
/**
 *Submitted for verification at Etherscan.io on 2020-06-16
*/

/**
*   @dev DateTimeAPI Interface
*/
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

/**
* @dev IncomeStreamCreator Contract
*/
contract IncomeStreamCreator {
    // State variables
    address payable public owner;
    uint256 public minWaitingPeriod = 15; // -> about two weeks
    uint256 public minDepositETH = .49 ether;
    uint256 public maxDepositETH = 42.1 ether; // calculate later using current eth price*
    
    // Structs
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
    
    // More state variables
    Stream[] public streamsArray;
    address[] public streamAccounts;
    
    // Mappings
    uint256 public streamCount;
    mapping(uint256 => Stream) public userStreams;
    mapping(address => Stream) public streams;
    mapping(uint => string) public names;
    
    mapping(address => uint256) public streamBalances;
    
    // Events
    event StreamCreated(
        uint256 _streamId,
        address indexed _streamOwner,
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
        address indexed _owner,
        uint256 _amount,
        uint256 _streamId
    );
    
    event WithdrawMade(
        uint256 _amount,
        address _user
    );
    
    // Constructor
    constructor() public 
    {
        owner = msg.sender;
    }
    
    
    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the owner.");
        _;
    }
    
    function updateMaxEthPrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
        maxDepositETH = _newPrice;
        updated = true;
        return updated;
    }
    
    function updateMinUEthrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
        minDepositETH = _newPrice;
        updated = true;
        return updated;
    }
    
    function getStreamCount() public view returns(uint256 _totalStreams) {
        _totalStreams = streamCount;
        return _totalStreams;
    }

    function getStream(uint256 _streamId) public view returns(Stream memory) {
          return streamsArray[_streamId];
    }
    
    function getAll() public view returns (Stream[] memory){
        Stream[] memory ret = new Stream[](streamCount);
        for (uint i = 0; i < streamCount; i++) {
            ret[i] = streamsArray[i];
        }
        return ret;
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
        //require(_amount > minDepositETH, "Must be above .49 to participate.");
        require(_amount < maxDepositETH, "Must be below 42.1 to participat.");
        // create a new entity/stream
        Stream memory stream;
        // set its params
        uint256 streamId = streamCount++;
        stream.streamId = streamId;
        stream.streamOwner = msg.sender;
        // This will be an enhanced calculation later on
        stream.streamValue = msg.value;
        stream.duration = _duration;
        stream.frequency = _frequency;
        stream.depositAmt = _amount;
        stream.dateCreated = block.timestamp;
        stream.payment = _payment;
        
        streamsArray.push(stream);
        streams[msg.sender] = stream;
        streamBalances[msg.sender] = stream.streamValue;

        
        // send the streams tokens to the owner
        sendOwnerStreamTokens(msg.sender, _payment * _frequency * _duration, streamId);
        
        
        // Notify of success
        emit StreamCreated(streamId, msg.sender, _amount, _duration, _payment, _frequency);
        //return stream;
    }
    
    
    function sendOwnerStreamTokens(address payable _owner, uint256 _payment, uint256 _streamId) public payable {
        //require(_payment >= minDepositETH, "Must be above 10 to participate.");
        //require(_payment <= maxDepositETH, "Must be below 1000 to participat.");
        // send tokens representing the income stream to owner
        // swap the eth for stream tokens @ 1 JAR = 1 DAI rate
        
        
        emit TokensSent(_owner, _payment, _streamId);
    }
    
    
    function transferStream(uint256 _streamId, address _newOwner) public payable {
        require(_streamId >= 0, "Your id is not a positive integer.");
        require(_newOwner != msg.sender, "Cannot transfer to your self.");
        
        // transfer stream logic here...
        
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