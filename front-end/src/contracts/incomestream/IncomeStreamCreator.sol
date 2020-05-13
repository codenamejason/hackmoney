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
    uint256 public deadline;
    uint256 public deferment;
    address public owner;
    bool public isMember;
    address public streamTokenReceiverAddress;
    uint256 public priceToRegister;
    bytes32 constant MEMBER_HASH = keccak256("iNET_MEMBER");

    bytes public userData;
    bytes public operatorData;

    StreamToken _token;

    mapping(address => bool) registeredAddresses;
    mapping(address => Member) memberInfoArray;

    Member public member;

    struct Member {
        address payable id;

    }

    constructor ()
        public
    {
        
    }

    /**
    *   @dev */
    function createIncomeStream(
        uint256 _amount,
        uint256 _duration,
        uint256 _frequency,
        uint256 _payment,
        address payable _owner,
        address[] memory _defalultOperators
    ) public
    {
        // register the user
        register();

        // set the owner / validate

        // set the defaultOperators

        // mint the 777 token for the stream
        _mint(msg.sender, 1, userData, operatorData);

        // transfer token to owner
    }

    function register() public payable {
        // assign address with true for registered member
        registeredAddresses[msg.sender] = true;

        // do some other registration stuff...
        
    }


    function unregister(address memberAddress) public {
        registeredAddresses[msg.sender] = false;
    }
}