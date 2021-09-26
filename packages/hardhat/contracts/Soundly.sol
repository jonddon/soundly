//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/access/AccessControl.sol";

contract Soundly {
    event ArtistAdded(address artist, string artistName);
    event MusicAdded(bytes32 id, address artist, uint category);


    // mapping(bytes32 => address) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    mapping(address => Music) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    mapping(address => Artist) artists;
    bytes32[] public allMusics;
    address[] public allArtists;

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
        Music storage music = artistMusics[_artist];
        music.artist = _artist;
        music.category = _category;
        music.ids = _musicIDs;
        artistMusics[_artist] = music;

        for(uint256 i; i < _musicIDs.length; i++) {
            allMusics.push(_musicIDs[i]);
            emit MusicAdded(_musicIDs[i], _artist, _category);
        }
    }

    // add an artist to the contract
    function addArtist(address _artist, string memory _name)
        external
        returns (bool success)
    {
        require(artists[_artist].isArtist != 0, "Artist already exists");
        Artist storage artist = artists[_artist];
        artist.name = _name;
        artist.isArtist = 1;
        allArtists.push(_artist);
        success = true;
        emit ArtistAdded(_artist, _name);
    }


    // MODIFIERS
    modifier artistExist(address _artist) {
        require(artists[_artist].isArtist != 0, "Address param is not an artist yet");
        _;
    }
}

