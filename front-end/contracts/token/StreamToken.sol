pragma solidity  >=0.4.22 <0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StreamToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Stream Token", "iNETs") public {
    }

    function awardItem(address member, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(member, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

// import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

// contract StreamToken is ERC777 {


//     constructor(
//         uint256 initialSupply,
//         address[] memory defaultOperators
//     )
//         ERC777("InsureNET Stream Token", "iNETs", defaultOperators)
//         public
//     {
//         _mint(msg.sender, msg.sender, initialSupply, "");
//     }
// }