import React from "react";
import HeadPhone from "../assets/img/headphones.svg";
import "./css/Login.scss";
import { Link } from "react-router-dom";
import Brand from "../fragment/Brand";

class Login extends React.Component {
  render() {
    return (
      <section id="main">
        <div className="nav-item">
          <Brand />
        </div>
        <div className="main-row">
          <div className="main-row-img">
            <img className="head-phone-img" src={HeadPhone} alt="" />
          </div>
          <div className="main-row-text">
            <h1>Music for everyone</h1>
            <p>The best streaming Platform for all</p>
            <Link to={"/home"} className="btn">
              Start Listening
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
