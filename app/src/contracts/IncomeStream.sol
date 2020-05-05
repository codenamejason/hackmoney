pragma solidity ^0.5.15;

contract IncomeStream {
    address founder = 0xdf972c62237bd76d27058cD13989e0EE9C1445D9;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    struct Stream {
        uint256 id;

    }

    event StreamPurchased(
        uint256 id


    );

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _streamId,
        uint256 _duration,
        uint256 _value,
        bool spoiled
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _streamId,
        uint256 _duration,
        uint256 _value,
        bool spoiled
    );

    constructor() public {

    }

     /**
    *   @dev createStream
    */
    function createStream(
        address _ownerOfStream,
        uint256 _value,
        uint256 _duration
    )
        public
        returns(bool)
    {
        if(true){ // pseudo code




            return true;
        } else {


            return false;
        }
    }

    /**
    *   @dev balanceOfStream
    */
    function balanceOfStream(
        address _incomeStream
    )
        public
        view
        returns(uint256)
    {

    }


    /**
    *   @dev freezeStream
    */
    function freezeStream(
        address _ownerOfStream,
        uint256 _duration
    )
        public
        onlyOwner
    {

    }

    /**
    *   @dev burnStream
    */
    function burnStream(
        address _ownerOfStream,
        uint256 _streamId
    )
        public
    {
        
    }

    /**
    *   @dev transferStream
    */
    function transferStream(
        address _ownerOfStream,
        uint256 _streamId,
        address _newOwnerOfStream
    )
        public
        onlyOwner
    {
        burnStream(_streamId);
    }



    // /**
    // * @dev Throws if called by any account other than the owner.
    // */
    modifier onlyOwner() {
        require(msg.sender == founder, 'Must me founder/owner');
        _;
    }
}