pragma solidity ^0.5.15;

contract Faucet {
    address public faucet;

    struct Requestor {
        address requestorAddress;
        uint256 amountRequested;
    }

    Requestor[] public requestors;

    constructor () public payable {
        faucet = msg.sender;
    }

    event Sent(address _address, uint256 _amount);
    event Received();

    function receive ()
        public
        payable
    {
        emit Received();
    }

    function send (address payable _requestor, uint256 _request)
        public payable
    {
        uint256 amountSent = 0;
        // covert to wei
        _request = _request * 1e18;

        if(address(this).balance > _request) {
            amountSent = _request/1e18;
            _requestor.transfer(_request);
        } else {
            amountSent = (address(this).balance)/1e18;
            _requestor.transfer(address(this).balance);
        }

        Requestor memory r;
        r.requestorAddress = _requestor;
        r.amountRequested = amountSent;
        requestors.push(r);
        emit Sent(_requestor, amountSent);
    }

}