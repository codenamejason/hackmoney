//pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;

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
    uint256 public minWaitingPeriod = 29;
    //uint256 public minDepositUSD = 100;
    //uint256 public maxDepositUSD = 10000;
    uint256 public minDepositETH = .5 ether;
    uint256 public maxDepositETH = 42 ether; // calculate later using current eth price*
    //uint256 public priceToRegister = .25 ether;
    //bytes32 public userData = keccak256("some user data to be overwritten sometime in the future.");
    
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
    
    struct Member {
        address memberAddress;
        bytes32 email;
        bytes32 memberData;
        uint256 balance;
        bool active;
    }
    
    // More state variables
    Stream[] public streamsArray;
    Member[] public membersArray;
    address[] public memberAccounts;
    address[] public streamAccounts;
    
    // Mappings
    uint256 public streamCount;
    mapping(uint256 => Stream) public userStreams;
    mapping(address => Stream) public streams;
    mapping(uint => string) public names;
    
    uint256 public memberCount;
    mapping(address => bool) public knownMembers;
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
    
    //function updateMaxUsdPrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
    //    maxDepositUSD = _newPrice;
    //    updated = true;
    //    return updated;
    //}
    
    //function updateMinUsdPrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
    //    minDepositUSD = _newPrice;
    //    updated = true;
    //    return updated;
    //}
    
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
    
    //function updateMemberRegistrationPrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
    //    priceToRegister = _newPrice;
    //    updated = true;
    //    return updated;
    //}
    
    function isMember(address _memberAddress) public view returns(bool _isMember) {
        _isMember = knownMembers[_memberAddress];
        return _isMember;
    }
    
    function getMemberCount() public view returns(uint _memberCount) {
        _memberCount = membersArray.length;
        return _memberCount;
    }
    
    function newMember(address _memberAddress, bytes32 _email, bytes32 _memberData) public returns(uint256 rowNumber) {
        require(isMember(_memberAddress), "must not already be a member");
        Member memory member;
        member.memberAddress = _memberAddress;
        member.email = _email;
        member.balance = 0;
        member.memberData = _memberData;
        member.active = true;
        knownMembers[_memberAddress] = true;
        membersArray.push(member);
        
        return membersArray.length - 1;
    }
    
    function updateMember(uint256 _rowNumber, address _memberAddress, bytes32 _memberData) public returns(bool success) {
        require(isMember(_memberAddress), "Must be a member to update");
        require(membersArray[_rowNumber].memberAddress != _memberAddress, "Address must align with the row number passed in.");
        membersArray[_rowNumber].memberData = _memberData;
        
        return true;
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
        require(_amount >= minDepositETH, "Must be above 10 to participate.");
        require(_amount <= maxDepositETH, "Must be below 1000 to participat.");
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
        //stream.dateCreated = block.timestamp;
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
    
    
    function sendOwnerStreamTokens(address payable _owner, uint256 _payment, uint256 _streamId) internal {
        // send tokens representing the income stream to owner
        
        
        
        
        emit TokensSent(_owner, _payment, _streamId);
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

