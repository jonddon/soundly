//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/access/AccessControl.sol";

contract Soundly {
    event ArtistAdded(address artist, string artistName, uint8 verified);
    event MusicAdded(bytes32 id, address artist, uint category);


    mapping(bytes32 => address) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    // mapping(address => Music) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    mapping(address => Artist) artists;
    bytes32[] public allMusics;
    address[] public allArtists;
    uint256 public musicCount;
    uint256 public artistCount;

    // Struct of artist existing and list of artistMusics ID
    struct Artist {
        uint8 isArtist;
        uint8 verified;
        string name;
    }

    struct Music {
        uint category; // 0 - single track, 1 - album, 2 - EP
        bytes32[] ids;
        address artist;
    }

    // add a music to the contract
    function addMusic(bytes32[] memory _musicIDs, address _artist, uint _category)
        external
        artistExist(_artist)
    {
        require(_musicIDs.length > 0, "music list empty");

        for(uint256 i; i < _musicIDs.length; i++) {
            if(musicExist(_musicID)) {
                continue;
            }
            allMusics.push(_musicIDs[i]);
            artistMusics[_musicIDs[i]] = _artist;
            musicCount++;
            emit MusicAdded(_musicIDs[i], _artist, _category);
        }
    }

    // add an artist to the contract
    function addArtist(address _artist, string memory _name, uint8 _verified)
        external
        artistExist(_artist)
        returns (bool success)
    {
        Artist storage artist = artists[_artist];
        artist.name = _name;
        artist.verified = _verified;
        artist.isArtist = 1;
        allArtists.push(_artist);
        success = true;
        artistCount++;
        emit ArtistAdded(_artist, _name, _verified);
    }

    function musicExist(bytes32 _musicID) returns (bool) {
        if (artistMusics[_musicID] == address(0)) {
            return false;
        }
        return true;
    }

    // MODIFIERS
    modifier artistExist(address _artist) {
        require(artists[_artist].isArtist == 0, "Address param is already an artist");
        _;
    }

}

