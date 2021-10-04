import React, { useContext } from "react";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";
import { useMoralis } from "react-moralis";
import { ThemeContext } from "../../api/Theme";
import { ExploreOutlined, HomeOutlined, PlaylistPlay, SearchOutlined } from "@material-ui/icons";

function SideBar() {
  const { user, isAuthenticated } = useMoralis();
  console.log("user from sidebar", user, isAuthenticated);
  const useStyle = useContext(ThemeContext);
  return (
    <aside className={"aside-bar"}>
      <div className="aside-bar-container">
        <div className="profile-wrapper">
          <img src={"../profile.png"} alt="profile" className="profile-picture" />
        </div>
        <SideBarOptions className={"lib-sub"} Icon={HomeOutlined} href={"/home"} title={"Home"} />
        <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home"} title={"Search"} />
        <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist"} title={"Playlist"} />

        {isAuthenticated && (
          <SideBarOptions className={"lib-sub"} Icon={ExploreOutlined} href={"/dashboard"} title={"Dashboard"} />
        )}

        {/* <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home/search"}  title={"Search"}/> */}
        {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
      </div>
      {/* <div className="aside-bar-container playlist">
        <p className={"p1"}>
          <span>MY PLAYLIST</span>
        </p>
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={"/home/playlist/instrumental"}
          title={"Instrumental"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={"/home/playlist/electronic"}
          title={"Electronic"}
        />
      </div> */}
    </aside>
  );
}

/*
 *
 * */
export default SideBar;
