pragma solidity ^0.6.8;

interface AggregatorInterface {
  event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 timestamp);
  event NewRound(uint256 indexed roundId, address indexed startedBy, uint256 startedAt);

  function latestAnswer() external returns (int256);
  function latestTimestamp() external returns (uint256);
  function latestRound() external returns (uint256);
  function getAnswer(uint256 roundId) external returns (int256);
  function getTimestamp(uint256 roundId) external returns (uint256);

  // post-Historic

  function decimals() external returns (uint8);

  function getRoundData(uint256 _roundId)
      external
      returns (
          uint256 roundId,
          int256 answer,
          uint256 startedAt,
          uint256 updatedAt,
          uint256 answeredInRound
  );

  function latestRoundData()
      external
      returns (
          uint256 roundId,
          int256 answer,
          uint256 startedAt,
          uint256 updatedAt,
          uint256 answeredInRound
  );
}

contract EthPriceOracle {
    
    AggregatorInterface internal ref;
    
    // Eth Aggregator
    // 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
    
    constructor(address _aggregator) public {
        ref = AggregatorInterface(_aggregator);
    }
    
    function getLatestPriceOfEthUsd() public payable returns (int256) {
        return ref.latestAnswer();
    }
    
    
}

contract ReferenceConsumer {
  AggregatorInterface internal ref;

// The ropsten ETH-USD price feed is at:
// 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
// so pass that as the parameter
  constructor(address _aggregator) public {
    ref = AggregatorInterface(_aggregator);
  }

  function getLatestAnswer() public payable returns (int256) {
    return ref.latestAnswer();
  }

  function getLatestTimestamp() public payable returns (uint256) {
    return ref.latestTimestamp();
  }

  function getPreviousAnswer(uint256 _back) public payable returns (int256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getAnswer(latest - _back);
  }

  function getPreviousTimestamp(uint256 _back) public payable returns (uint256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getTimestamp(latest - _back);
  }
}