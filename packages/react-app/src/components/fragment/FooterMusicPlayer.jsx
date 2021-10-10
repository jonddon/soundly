import React, { useContext, useEffect, useRef, useState } from "react";
import "../assets/scss/FooterPlayer.scss";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Slider from "@material-ui/core/Slider";
import ControlsToggleButton from "./ControlsToggleButton";
import Name from "./Name";
import { ThemeContext } from "../../api/Theme";
import { useDispatch, useSelector } from "react-redux";
import { setBannerOpen, setCurrentPlaying } from "../../actions/actions";
import Button from "@material-ui/core/Button";
import { useMoralis } from 'react-moralis';
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';

function FooterMusicPlayer({ music }) {
  const { user, isAuthenticated } = useMoralis();
  const [{ id, name, author_name, img, musicName, artistAddress }, setCurrTrack] = useState(music);
  const [isRepeatClicked, setRepeatClick] = useState(false);
  const [isPrevClicked, setPrevClicked] = useState(false);
  const [isNextClicked, setNextClicked] = useState(false);
  const [isPlaying, setPlayPauseClicked] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [bannerToggle, setBannerToggle] = useState(false);

  const audioElement = useRef();
  const dispatch = useDispatch();
  // start a payment stream aka flow
  const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ['fDAI']
    });

  const testFlow = async () => {
    // console.log(sf);
    await sf.initialize();
    const carol = sf.user({
      address: user.get("ethAddress"),
      token: sf.tokens.fDAIx.address
    });
  
    await carol.flow({
      recipient: '0xA8f3447922d786045CB582B0C825723B744a54df',
      flowRate: "385802469135802"
    });
    
    const details = await carol.details();
    console.log(details);
};

  async function stopFlow(toAddress="0xA8f3447922d786045CB582B0C825723B744a54df") {
    const carol = sf.user({
      address: user.get("ethAddress"),
      token: sf.tokens.fDAIx.address
    });
    
   await carol.flow({
        toAddress,
        flowRate: 0
    });
}

  const { playlists } = useSelector(state => state.musicReducer);
  const useStyle = useContext(ThemeContext);
  const pointer = { cursor: "pointer", color: useStyle.theme };

  const handleToggle = (type, val) => {
    switch (type) {
      case "repeat":
        setRepeatClick(val);
        break;
      case "prev":
        setPrevClicked(val);
        break;
      case "play-pause":
        setPlayPauseClicked(val);
        break;
      case "next":
        setNextClicked(val);
        break;
      case "volume":
        setVolumeClicked(val);
        break;
      default:
        break;
    }
  };
  const handleSeekChange = (event, newValue) => {
    audioElement.current.currentTime = (newValue * duration) / 100;
    setSeekTime(newValue);
  };
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };
  const handleBannerToggle = () => {
    setBannerToggle(!bannerToggle);
  };

  useEffect(() => {
   
  }, [])

  useEffect(() => {
    dispatch(setBannerOpen(bannerToggle));
  }, [dispatch, bannerToggle]);

  useEffect(() => {
    isPlaying
      ? audioElement.current
          .play()
          .then(() => {})
          .catch(e => {
            audioElement.current.pause();
            audioElement.current.currentTime = 0;
          })
      : audioElement.current.pause();
    audioElement.current.loop = isRepeatClicked;
    audioElement.current.volume = volume / 100;
    audioElement.current.muted = isVolumeClicked;
    audioElement.current.onloadeddata = () => {
      if (audioElement.current != null) setDuration(audioElement.current.duration);
    };
    setInterval(() => {
      if (audioElement.current !== null) setCurrTime(audioElement.current.currentTime);
    });
  });

  useEffect(() => {
    setCurrTrack(music);
  }, [music]);

  useEffect(() => {
    setSeekTime(currTime / (duration / 100));
  }, [currTime, duration]);

  useEffect(() => {
    audioElement.current.onended = () => {
      setNextClicked(true);
    };
  });

  useEffect(() => {
    if (isNextClicked) {
      let currTrackId = (id + 1) % playlists.length;
      dispatch(setCurrentPlaying(playlists[currTrackId]));
      setNextClicked(false);
    }
    if (isPrevClicked) {
      let currTrackId = (id - 1) % playlists.length;
      if (id - 1 < 0) {
        currTrackId = playlists.length - 1;
      }
      dispatch(setCurrentPlaying(playlists[currTrackId]));
      setPrevClicked(false);
    }
  }, [dispatch, id, isNextClicked, isPrevClicked, playlists]);

  function formatTime(secs) {
    const t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let s = t.toTimeString().substr(0, 8);
    if (secs > 86399) s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s.substring(3);
  }
  return (
    <div className={"footer-player"}>
      <Button onClick={handleBannerToggle} className="curr-music-container">
        <img src={require("../assets/img/" + img).default} alt={name} className="music-art" />
        <div className="curr-music-details">
          <Name name={name} className={"song-name"} length={name.length} />
          <Name name={author_name} className={"author-name"} length={author_name.length} />
        </div>
      </Button>
      <div className="playback-controls">
        <div>
          <ControlsToggleButton
            style={pointer}
            type={"repeat"}
            defaultIcon={<RepeatIcon fontSize={"large"} />}
            changeIcon={<RepeatOneIcon fontSize={"large"} />}
            onClicked={handleToggle}
          />

          <ControlsToggleButton
            style={pointer}
            type={"prev"}
            defaultIcon={<SkipPreviousIcon fontSize={"large"} />}
            changeIcon={<SkipPreviousIcon fontSize={"large"} />}
            onClicked={handleToggle}
          />

          <audio ref={audioElement} src={require("../assets/music/" + musicName).default} preload={"metadata"} />

          <ControlsToggleButton
            style={pointer}
            type={"play-pause"}
            defaultIcon={<PlayArrowIcon fontSize={"large"} />}
            changeIcon={<PauseIcon fontSize={"large"} />}
            onClicked={handleToggle}
          />

          <ControlsToggleButton
            style={pointer}
            type={"next"}
            defaultIcon={<SkipNextIcon fontSize={"large"} />}
            changeIcon={<SkipNextIcon fontSize={"large"} />}
            onClicked={handleToggle}
          />
        </div>
        <div>
          <div className="playback">
            {!isNaN(seekTime) && (
              <>
                {" "}
                <span style={{ fontSize: "10px" }}>{formatTime(currTime)}</span>
                <Slider
                  style={{ color: useStyle.theme }}
                  className={"playback-completed"}
                  value={seekTime}
                  onChange={handleSeekChange}
                />
                <span style={{ fontSize: "10px" }}>{formatTime(duration)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <button onClick={testFlow}>Stream</button>
      <button onClick={stopFlow}>Stop</button>
      
      <div className="playback-widgets">
        <ControlsToggleButton
          style={pointer}
          type={"volume"}
          defaultIcon={<VolumeUpIcon />}
          changeIcon={<VolumeOffIcon />}
          onClicked={handleToggle}
        />
        <div className={"slider"}>
          <Slider style={{ color: useStyle.theme }} value={volume} onChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
}

export default FooterMusicPlayer;
