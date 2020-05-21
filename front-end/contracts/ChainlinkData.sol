pragma solidity ^0.4.24;

import "@chainlink/contracts/src/v0.4/interfaces/AggregatorInterface.sol";

// You can find a list of aggregator addresses at:
// https://docs.chain.link/docs/reference-contracts

contract ReferenceConsumer {
  AggregatorInterface internal ref;

// The ropsten ETH-USD price feed is at:
// 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
// so pass that as the parameter
  constructor(address _aggregator) public {
    ref = AggregatorInterface(_aggregator);
  }

  function getLatestAnswer() public view returns (int256) {
    return ref.latestAnswer();
  }

  function getLatestTimestamp() public view returns (uint256) {
    return ref.latestTimestamp();
  }

  function getPreviousAnswer(uint256 _back) public view returns (int256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getAnswer(latest - _back);
  }

  function getPreviousTimestamp(uint256 _back) public view returns (uint256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getTimestamp(latest - _back);
  }
}