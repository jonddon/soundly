import React from "react";
import ReactDom from "react-dom";
import App from "./app/App";
import "./index.scss";
import { createStore } from "redux";
import reducers from "./reducers/reducer";
import { Provider } from "react-redux";
import { MoralisProvider } from "react-moralis";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDom.render(
  <Provider store={store}>
    <MoralisProvider appId={process.env.MORALIS_APPID} serverUrl={process.env.MORALIS_SERVER_URL}>
      <App />
    </MoralisProvider>
  </Provider>,

  document.getElementById("root"),
);
