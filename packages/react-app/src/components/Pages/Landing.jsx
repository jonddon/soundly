import React from "react";
import Play from "../assets/img/big_play.png";
import "./css/Landing.scss";
import { Link } from "react-router-dom";
import Brand from "../fragment/Brand";

class Landing extends React.Component {
  render() {
    return (
      <section id="main">
        <div className="nav-item">
          <Brand />
        </div>
        <div className="main-row">
          <div className="main-row-img">
            <img className="head-phone-img" src={Play} alt="" />
          </div>
          <div className="main-row-text">
            <h1>Feel The Music</h1>
            <p>Stream over 20 thousand songs with one click</p>
            <div className="btn-group">
              <Link to={"/home"} className="btn">
                Join Now
              </Link>
              <Link to={"/signup"} className="btn">
                Sign Up as Artist
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
