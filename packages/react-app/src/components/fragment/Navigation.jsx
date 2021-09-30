import React, { useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import '../assets/scss/Navigation.scss';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import DropDownLanguageList from "./DropDownLanguageList";
// import SearchBar from "./SearchBar";
import Brand from "./Brand";
// import DropDownProfile from "./DropDownProfile";
import {Avatar, Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";

function Navigation() {

    // const [isLanguageListOpen, setLangList] = useState(false);
    // const [isOpenProfile, setOpenProfile] = useState(false);
    const { refetchUserData, isAuthenticating, logout, isUserUpdating, userError, authenticate, isAuthenticated, user } = useMoralis();

                                                                                                                                                                                  
    const useStyle = useContext(ThemeContext);
    return (
        <>
            {userError && <p>{userError.message}</p>}
            <nav style={useStyle.component}>
                <Brand />
                <div className={"navigation"}>
                
                    {/* <NavigationButton href={"/home"} name={"Home"}/>*/}
                    {/* <NavigationButton href={"/home/about"} name={"About"}/>*/}
                    {/*<NavigationButton href={"/home/add"} name={"Add"}/>*/}
                </div>
                {/* <SearchBar/> */}
            
                <div className="profile" >
                    {(!isAuthenticated) ?
    
                        <div>
                            <Button variant="contained" loading={isAuthenticating} onClick={() => authenticate()}>{isAuthenticating ? "Loading" : "Authenticate"}</Button>
                        </div>
                    
                        :
                        <div>
                    
                            <div>
                                <h1>Welcome </h1>
                                {
                                    user.get("ethAddress")
                                    
                                }
                            </div>
                            

                            <Button variant="outlined" color="secondary" loading={isAuthenticating ? true : undefined} onClick={() => logout()}  >
                                {isAuthenticating ? "Loading" : " Log out"}
                           
                            </Button>

                            <Button onClick={() => refetchUserData()} variant="contained" color="primary">
                                {isAuthenticating ? "Loading" : "Refetch user data"}
                            
                            </Button>
                        </div>
                    }
                    {/* {
                    (isAuthenticating)
                    ? <div>
                            <button>Loading...</button>
                        </div>
                    : null
                } */}
                
                    {/* <Button className={"Dropdown-btn"}
                    
                        startIcon={<Avatar style={{width:'30px',height:'30px',padding:'18px'}} ></Avatar>}
                        endIcon={isOpenProfile ? <ExpandMoreIcon/> : <ExpandLessIcon/>}>

                </Button> */}
                
                </div>
            </nav>
        </>
    );
        
}
export default Navigation;