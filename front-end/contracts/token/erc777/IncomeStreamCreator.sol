pragma solidity  0.6.8;


contract IncomeStreamCreator {
    // State variables
    address payable public  owner;
    //address public streamTokenReceiverAddress;
    uint256 public minWaitingPeriod = 29;
    uint256 public minDeposit = 99;
    uint256 public maxDeposit = 1001;
    uint256 public priceToRegister = .25 ether;
    bytes32 public MEMBER_HASH = keccak256("iNET_MEMBER_HASH");
    bytes public userData;
    //bytes public operatorData;
    
    enum Statuses { DEFAULT, PAID, NOT_PAID, EXPIRED, NEW }
    Statuses currentStatus;
    
    mapping(address => uint256) ownerbalances;

    // Events
    event StreamCreated(
        address _streamOwnerId,
        uint256 _streamAmount,
        uint256 _streamLength,
        uint256 _streamPayment,
        uint256 _streamFrequency
    );
    
    event Test (
        address from,
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
    
    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the owner.");
        _;
    }
    
    modifier enoughEther (uint256 _amount) {
        require(msg.value >= _amount, "Not enough ether provided.");
        _;
    }
    
    function createStream(
        uint256 _amount,
        uint256 _duration,
        uint256 _frequency,
        uint256 _payment
    ) public payable {
        require(_amount > minDeposit, "Must be above 99 to participate.");
        require(_amount < maxDeposit, "Must be below 1001 to participat.");
        
        
        owner = msg.sender;
        
        
        
        // Set the status to NEW stream
        currentStatus = Statuses.NEW;
        
        // send the ether to the owner
        
        
        // Send the stream token(s)
        
        
        emit StreamCreated(owner, _amount, _duration, _payment, _frequency);
    }
    
    
    function transferStream(uint256 streamId, address payable newOwner) public payable onlyOwner {
        owner = newOwner;
        
        
        emit Test(owner, "transferStream message from test", streamId, "transferStream");
    }
    
    function payStream(uint256 streamId) public payable {
        
        
        emit Test(msg.sender, "message from payStream", streamId, "payStream");
    }
    
    function approve(address _owner, uint256 _amount) public {
        
        //emit Approval(_owner, _owner, _amount);
    }
    

    function withdraw(uint256 _amount) public payable onlyOwner returns(bool) {
        require(_amount < address(this).balance, "Not enough to withdraw.");
        owner.transfer(msg.value);
        
        return true;
    }
    
    
    function withdrawAll() public payable onlyOwner returns(bool) {
        owner.transfer(address(this).balance);
        
        return true;
    }
    
    
    function getBalanceContract() public view returns(uint256) {
        return address(this).balance;
    }
    
    
    function receive() public {
        owner.transfer(address(this).balance);
    }
}