pragma solidity >=0.4.22 <0.7.0;

interface DaiToken {
    function transfer(address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
}

contract DaiFaucet {
    DaiToken daiToken = DaiToken(0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108); // Ropsten
    // Mainnet DaiToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);


    function requestDai() public {
        // Send 1 dai to requestor
        daiToken.transfer(msg.sender, 1000000000000000000);
    }
}