pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  //event SetPurpose(address sender, string purpose);

  string public purpose = "Building Unstoppable Apps!!!";
  struct Artist{
    string name;
    address account;
    bool isArtist;
  }

  mapping(uint => Artist) artists;
  mapping(uint => bytes32) artistMusic;

  constructor() {
    // what should we do on deploy?
  }

  function setPurpose(string memory newPurpose) public {
      purpose = newPurpose;
      console.log(msg.sender,"set purpose to",purpose);
      //emit SetPurpose(msg.sender, purpose);
  }
  function get() public {
    return purpose + "Get";
  }

function createArtist(string memory name, address account) public returns(Artist memory){
  Artist storage artist = artists[id];
  artist.name = name;
  artist.isArtist = true;
  artist.account = account;
  return artist;
}
  function setHash(bytes memory uri, uint id) public{
    
  }
}
