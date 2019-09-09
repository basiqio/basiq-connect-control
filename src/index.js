import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store";
import App from "./App";

import "./styles/Layout.css";

// eslint-disable-next-line no-console
console.log("Basiq Connect Control v1.0.3");

const BasiqConnect = (inputs) => {
  if(inputs && inputs.containerId !== null){
    const { containerId, connectLinkId, token, userID, connect, upload, companyName } = inputs;
    ReactDOM.render(
      <Provider store={configureStore()}>
        <App connectLink={connectLinkId} token={token} userID={userID}
          connect={connect} upload={upload} companyName={companyName}/>
      </Provider>,
      document.getElementById(containerId));
  } else {
    // eslint-disable-next-line no-console
    console.error("BASIQ CONNECT CONTROL ERROR: Provided container node doesn't exist.");
  }
};

export default BasiqConnect;
