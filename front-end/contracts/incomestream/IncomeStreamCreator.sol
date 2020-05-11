pragma solidity  >=0.4.22 <0.7.0;

//import '@openzeppelin/contracts/token/ERC777/ERC777.sol';
import '../token/erc777/StreamToken.sol';
//import '../token/erc777/StreamTokenReceiver.sol';

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
        address payable owner,
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


    // function getMemberInfo(address memberAddress) public view returns(Member) {
    //     // get the member info for address
    //     Member _member = new Member(memberAddress);
    //     _member = memberInfoArray[memberAddress];
    //     return _member;
    // }



}


contract owned {
    constructor() public { owner = msg.sender; }
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract destructible is owned {
    // This contract inherits the `onlyOwner` modifier from
    // `owned` and applies it to the `destroy` function, which
    // causes that calls to `destroy` only have an effect if
    // they are made by the stored owner.
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}

contract priced {
    // Modifiers can receive arguments:
    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }
}


contract Register is priced, destructible {
    mapping (address => bool) registeredAddresses;
    uint price;

    constructor(uint initialPrice) public { price = initialPrice; }

    // It is important to also provide the
    // `payable` keyword here, otherwise the function will
    // automatically reject all Ether sent to it.
    function register() public payable costs(price) {
        registeredAddresses[msg.sender] = true;
    }

    function changePrice(uint _price) public onlyOwner {
        price = _price;
    }
}

contract Mutex {
    bool locked;
    modifier noReentrancy() {
        require(
            !locked,
            "Reentrant call."
        );
        locked = true;
        _;
        locked = false;
    }

    /// This function is protected by a mutex, which means that
    /// reentrant calls from within `msg.sender.call` cannot call `f` again.
    /// The `return 7` statement assigns 7 to the return value but still
    /// executes the statement `locked = false` in the modifier.
    function f() public noReentrancy returns (uint) {
        (bool success,) = msg.sender.call("");
        require(success);
        return 7;
    }
}