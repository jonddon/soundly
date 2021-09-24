pragma solidity ^0.8.4;
//SPDX-License-Identifier: MIT

import "@openzeppelin-contracts/contracts/access/AccessControl.sol";

contract Soundly is AccessControl {
    event ArtistAdded(address artist, string artistName);
    event MusicAdded(bytes32 id, address artist, uint category);

    // Standard roles definition
    // bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;
    bytes32 public constant DEFAULT_ADMIN_ROLE = keccak256("DefaultAdminRole");
    bytes32 public constant ADMIN_ROLE = keccak256("AdminRole");
    bytes32 public constant ARTIST_ROLE = keccak256("ArtistRole");

    // mapping(bytes32 => address) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    mapping(address => Music) artistMusics; // mapping of filecoin/IPFS music ID to the artist address
    mapping(address => Artist) artists;
    bytes32[] public allMusics;
    address[] public allArtists;

    // Struct of artist existing and list of artistMusics ID
    struct Artist {
        bool isArtist;
        bool verified;
        bytes32[] musicsID;
        string name;
    }

    struct Music {
        uint category; // 0 - single track, 1 - album, 2 - EP
        bytes32[] ids;
        address artist;
    }

    // these two address parameters would be have admin priviledges
    constructor(address _admin1, address _admin2) public {
        _setRoleAdmin(ADMIN_ROLE, _msgSender());
        _setRoleAdmin(ARTIST_ROLE, _msgSender());
        _grantRole(ADMIN_ROLE, _admin1);
        _grantRole(ADMIN_ROLE, _admin2);
    }

    // add a music to the contract
    function addMusic(bytes32[] memory _musicIDs, address _artist, uint _category)
        external
        artistExist(_artist)
        hasAdminOrArtistRole(_msgSender())
    {
        require(_musicIDs.length > 0, "music list empty");
        Music storage music = artistMusics[_artist];
        music.artist = _artist;
        music.category = _category;
        music.ids = _musicIDs;
        artistMusics[_artist] = music;

        for(uint256 i; i < _musicIDs.length; i++) {
            artists[_artist].musicsID.push(_musicIDs[i]);
            allMusics.push(_musicIDs[i]);
        }
    }

    // add an artist to the contract
    function addArtist(address _artist)
        external
        onlyRole(ADMIN_ROLE)
        returns (bool success)
    {
        require(!artists[_artist].isArtist, "Artist already exists");
        _grantRole(ARTIST_ROLE, _artist);
        artists[_artist].isArtist = true;
        allArtists.push(_artist);
        success = true;
    }

    // INTERNAL HELPERS
    function _msgSender() internal returns(address) {
        return msg.sender;
    }

    // MODIFIERS
    modifier artistExist(address _artist) {
        require(artists[_artist].isArtist, "Address param is not an artist yet");
        _;
    }

    // check that account has is an artist or an admin
    modifier hasAdminOrArtistRole(address _account) {
        require(hasRole(ADMIN_ROLE, _account) || hasRole(ARTIST_ROLE), "Neither an artist or admin");
        _;
    }
}

