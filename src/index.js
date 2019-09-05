import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";
import App from "./App";

import "./styles/Layout.css";

const BasiqConnect = (inputs) => {
  if(inputs && inputs.containerId !== null){
    const { containerId, connectLinkID, token, userID, connect, upload, companyName } = inputs;
    ReactDOM.render(
      <Provider store={configureStore()}>
        <App connectLink={connectLinkID} token={token} userID={userID}
          connect={connect} upload={upload} companyName={companyName}/>
      </Provider>,
      document.getElementById(containerId));
  } else {
    // eslint-disable-next-line no-console
    console.error("BASIQ CONNECT CONTROL ERROR: Provided container node doesn't exist.");
  }
};

export default BasiqConnect;
