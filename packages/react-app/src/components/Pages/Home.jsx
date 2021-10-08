import React, { useContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "./css/Home.scss";
import Navigation from "../fragment/Navigation";
import MobileTopNavigation from "../fragment/MobileTopNavigation";
import SideBar from "../fragment/SideBar";
import FooterMusicPlayer from "../fragment/FooterMusicPlayer";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import MusicCardContainer from "../fragment/MusicCardContainer";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../api/Theme";
import Profile from "./Profile";
import AddMusic from "../fragment/AddMusic";
import FooterSelectMusic from "../fragment/FooterSelectMusic";
import CurrentPlayingLarge from "../fragment/CurrentPlayingLarge";
import Search from "./Search";
import About from "./About";
import Playlist from "../fragment/Playlist";
import { Skeleton } from "@material-ui/lab";
import Dashboard from "./Dashboard";

function getCurrPage(pathName) {
  switch (pathName) {
    case "/home":
      return <MusicCardContainer />;
    case "/home/search":
      return <Search />;
    case "/home/profile":
      return <Profile />;
    case "/home/add":
      return <AddMusic />;
    case "/home/about":
      return <About />;
    case "/home/dashboard":
      return <Dashboard />;
    default:
      if (pathName.startsWith("/home/playlist/")) {
        return <Playlist />;
      }
      return null;
  }
}

function Home() {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currMusic, setCurrMusic] = useState(null);
  const [Page, setCurrPage] = useState(<MusicCardContainer />);

  let pathname = window.location.pathname;
  useEffect(() => {
    setCurrPage(getCurrPage(pathname));
  }, [pathname]);

  window.addEventListener("resize", handleResize);

  function handleResize() {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const useStyle = useContext(ThemeContext);
  const { playing, bannerOpen } = useSelector(state => state.musicReducer);

  useEffect(() => {
    setCurrMusic(playing);
  }, [playing]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={useStyle.component} className={"home-container"}>
      {!loaded ? (
        <div className="Home-skeleton">
          <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
        </div>
      ) : (
        <>
          <section className={"home-music-container"}>
            <div className="sidebar-home">
              <SideBar />
            </div>
            <div className="main-home">
              <div id={"main-content"}>
                {screenSize <= 970 ? <MobileTopNavigation /> : <Navigation />}
                  <div className={"page-content"}>
                    {Page}
                  </div>
                
              </div>
            </div>
          </section>
          {bannerOpen && (
            <section className="current-large-banner">
              <CurrentPlayingLarge />
            </section>
          )}
          <React.Fragment>
            {currMusic ? <FooterMusicPlayer music={currMusic} /> : <FooterSelectMusic />}
            {/* <FooterMusicPlayer music={currMusic} /> */}
            {screenSize <= 970 && <BottomNavigationMobile />}
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default Home;
