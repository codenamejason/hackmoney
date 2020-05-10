pragma solidity  >=0.4.22 <0.7.0;

//import '@openzeppelin/contracts/token/ERC777/ERC777.sol';
import '../token/erc777/StreamToken.sol';

/**
*   @dev IncomeStreamCreator contract
*/
contract IncomeStreamCreator is StreamToken {
    uint256 public deadline;
    uint256 public deferment;
    address public owner;

    bytes public userData;
    bytes public operatorData;

    constructor () public {
        
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

        // set the owner / validate

        // set the defaultOperators

        // mint the 777 token for the stream
        _mint(msg.sender, 1, userData, operatorData);

        // transfer token to owner
    }

}