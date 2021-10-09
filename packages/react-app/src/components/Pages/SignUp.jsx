/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useMoralis } from "react-moralis";
import "./css/SignUp.scss";
import Navigation from "../fragment/Navigation";
import { ThemeContext } from "../../api/Theme";


const SignUp = () => {
  const [ name, setName ] = useState('');
  const [twitter, setTwitter] = useState('');
   const { isAuthenticating, logout, userError, authenticate, isAuthenticated, user, isLoggingOut, setUserData } =
    useMoralis();

  const useStyle = useContext(ThemeContext);

  const login = async() => {
    await authenticate({ signingMessage: "Login in to Soundly" });
    setUserData({
        name: name,
        twitter: twitter,
        isVerified: false,
    })

    console.log(user.get("name"));
  }
  
    // if (user) {
    //   user.set("username", name);
    //   user.set("twitter", twitter);
    //   user.set("isVerified", false);

    //   user.save();
    //    console.log(user);
    // }
   
    // console.log(twitter);
  return (
    <div className={"signup-wrapper"}>
      <Navigation />
      <div className={"sign-up-main"}>
        <div className={"join-title"}>
          <h1>
            Join the <span> fun.</span>
          </h1>
          <p>Stream over 20 thousand songs pay as you go</p>
        </div>
        <div className="sign-form-wrapper">
          <div >
            <label htmlFor="name">Artist Name:</label>
            <input type="text" name="name" id="name" onChange={(e) =>setName(e.target.value) }/>
            <label htmlFor="socials">Social Media:</label>
            <input type="url" name="twitter" id="twitter" onChange={(e) => setTwitter(e.target.value) } />
            <button onClick={() => login()} className={"register-btn"}> Register with Metamask</button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default SignUp;