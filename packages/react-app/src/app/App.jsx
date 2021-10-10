import React, { useEffect } from "react";
import "./App.scss";
import Home from "../components/Pages/Home";
import Dashboard from "../components/Pages/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "../components/Pages/Landing";
import { ThemeContext, themes } from "../api/Theme";
import musicDB from "../db/music";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../actions/actions";
import SignUp from "../components/Pages/SignUp";
import AddMusics from "../components/Pages/AddMusics";

const App = () => {
  const { language } = useSelector(state => state.musicReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (language === null || language.includes("any")) {
      dispatch(setPlaylist(musicDB));
    } else if (language.includes("hindi")) {
      alert("No hindi tracks available");
    } else {
      let x = musicDB.filter(item => item.lang && language.includes(item.lang.toLowerCase()));
      dispatch(setPlaylist(x));
    }
  }, [dispatch, language]);

  return (
    <ThemeContext.Provider value={themes.dark}>
      <div className="main-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/add-music" component={AddMusics} />
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
