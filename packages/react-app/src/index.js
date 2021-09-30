import React from "react";
import ReactDom from "react-dom";
import App from "./app/App";
import "./index.scss";
import { createStore } from "redux";
import reducers from "./reducers/reducer";
import { Provider } from "react-redux";
import { MoralisProvider } from "react-moralis";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const REACT_APP_MORALIS_APPID="oa489V4HohegnaBRdmNsbdHQpDe9rQyb2835vXsZ"
const REACT_APP_MORALIS_SERVER_URL="https://hhg4sasmbn5k.moralishost.com:2053/server"

ReactDom.render(
  <Provider store={store}>
    <MoralisProvider appId={REACT_APP_MORALIS_APPID} serverUrl={REACT_APP_MORALIS_SERVER_URL}>
      <App />
    </MoralisProvider>
  </Provider>,

  document.getElementById("root"),
);
