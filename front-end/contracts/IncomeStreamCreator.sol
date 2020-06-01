pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;

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
    address payable public owner;
    //address payable public streamOwner;
    uint256 public minWaitingPeriod = 29;
    uint256 public minDeposit = 99;
    uint256 public maxDeposit = 1001;
    uint256 public priceToRegister = .25 ether;
    bytes32 public MEMBER_HASH = keccak256("iNET_MEMBER_HASH");
    bytes32 public userData = keccak256("some user data to be overwritten sometime in the future.");
    
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
    
    
    Stream[] public streamsArray;
    Member[] public members;
    address[] public memberAccounts;
    address[] public streamAccounts;
    
    // counter
    uint256 streamCount;
    uint256 memberCount;

    // mappings mapping(_KeyType => _ValueType)
    mapping(address => Stream) public streams;
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
        uint256 _amount
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
    
    function isMember(address _memberAddress) public view returns(bool isMember) {
        return knownMembers[_memberAddress];
    }
    
    function getMemberCount() public view returns(uint memberCount) {
        return members.length;
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
        members.push(member);
        
        return members.length - 1;
    }
    
    function updateMember(uint256 _rowNumber, address _memberAddress, bytes32 _memberData) public returns(bool success) {
        require(isMember(_memberAddress), "Must be a member to update");
        require(members[_rowNumber].memberAddress != _memberAddress, "Address must align with the row number passed in.");
        members[_rowNumber].memberData = _memberData;
        
        return true;
    }

    function getStreamCount() public view returns(uint256 totalStreams) {
        totalStreams = streamCount;
        return totalStreams;
    }

    function getStream(uint256 _streamId) public view returns(Stream memory) {
          return streamsArray[_streamId];
    }
   
    //function getStreams(address _owner) public view returns(Stream[] memory) {
    //     return streams[_owner];
    //}
   
    //function getAll() public view returns (address[] memory){
    //    address[] memory ret = new address[](streamCount);
    //    for (uint i = 0; i < streamCount; i++) {
    //    ret[i] = streamAccounts[i];
    //}
    //    return ret;
    //}
    
   
   
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
        sendOwnerStreamTokens(msg.sender, _payment * _frequency * _duration);
        
        
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

