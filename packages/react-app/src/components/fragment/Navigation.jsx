import React, { useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import "../assets/scss/Navigation.scss";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import DropDownLanguageList from "./DropDownLanguageList";
import SearchBar from "./SearchBar";
import Brand from "./Brand";
// import DropDownProfile from "./DropDownProfile";
import { Avatar, Button } from "@material-ui/core";
import { ThemeContext } from "../../api/Theme";
import { ArrowBack } from "@material-ui/icons";

function Navigation() {
  // const [isLanguageListOpen, setLangList] = useState(false);
  // const [isOpenProfile, setOpenProfile] = useState(false);
  const { isAuthenticating, logout, userError, authenticate, isAuthenticated, user, isLoggingOut, setUserData } =
    useMoralis();

  const useStyle = useContext(ThemeContext);
  const login = async () => {
    let user = await authenticate({ signingMessage: "Login in to Soundly", onComplete: () => alert("🎉") });
   
  };
  return (
    <>
      {userError && <p>{userError.message}</p>}
      <nav>
        <Brand />
        {/* <div className={"navigation"}>
          <NavigationButton href={"/home"} name={"Home"}/>
          <NavigationButton href={"/home/about"} name={"About"}/>
          <NavigationButton href={"/home/add"} name={"Add"}/>
        </div>
         <SearchBar/> */}
        <SearchBar />
        <div className="profile">
          {!isAuthenticated ? (
            <div>
              <Button variant="contained" onClick={() => login()}>
                {isAuthenticating ? "Logging in..." : "Login"}
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="outlined" color="primary">
                  {user.get("ethAddress").slice(0, 8)}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                loading={isAuthenticating ? true : undefined}
                onClick={() => logout()}
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </Button>

              {/* <Button onClick={() => refetchUserData()} variant="contained" color="primary">
                {isAuthenticating ? "Loading" : "Refetch user data"}
              </Button> */}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navigation;
