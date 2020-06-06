pragma solidity ^0.6.0;

contract Member {
    address payable public owner;
    uint256 public priceToRegister = .25 ether;
    bytes32 public userData = keccak256("some user data to be overwritten sometime in the future.");
    

    struct Member {
        address memberAddress;
        bytes32 email;
        bytes32 memberData;
        uint256 balance;
        bool active;
    }

    Member[] public membersArray;
    address[] public memberAccounts;

    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the owner.");
        _;
    }

    uint256 public memberCount;
    mapping(address => bool) public knownMembers;
    mapping(uint => string) public names;

    function updateMemberRegistrationPrice(uint256 _newPrice) public onlyOwner returns (bool updated) {
       priceToRegister = _newPrice;
       updated = true;
       return updated;
    }
    
    function isMember(address _memberAddress) public view returns(bool _isMember) {
       _isMember = knownMembers[_memberAddress];
       return _isMember;
    }
    
    function getMemberCount() public view returns(uint _memberCount) {
       _memberCount = membersArray.length;
       return _memberCount;
    }
    
    function newMember(address _memberAddress, bytes32 _email, bytes32 _memberData) public returns(uint256 rowNumber) {
       require(isMember(_memberAddress), "must not already be a member");
       Member memory member;
       member.memberAddress = _memberAddress;
       member.email = _email;
       member.balance = 0;
       member.memberData = _memberData;
       member.active = true;
       knownMembers[_memberAddress] = true;
       membersArray.push(member);
       return membersArray.length - 1;
    }
    
    function updateMember(uint256 _rowNumber, address _memberAddress, bytes32 _memberData) public returns(bool success) {
       require(isMember(_memberAddress), "Must be a member to update");
       require(membersArray[_rowNumber].memberAddress != _memberAddress, "Address must align with the row number passed in.");
       membersArray[_rowNumber].memberData = _memberData;
      return true;
    }




}