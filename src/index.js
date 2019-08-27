// IE11 compatibility.
import "react-app-polyfill/ie11";
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store";

import Lato from "lato-font";
import "./styles/Layout.css";
import "font-awesome/css/font-awesome.min.css";
import ReactDOM from 'react-dom';

const BasiqConnect = (inputs) => {
  if(inputs && inputs.containerId !== null){
    let {containerId, connectLink, token, userID, connect, upload, companyName} = inputs;
    ReactDOM.render(
      <Provider store={configureStore()}>
        <App connectLink={connectLink} token={token} userID={userID} connect={connect} upload={upload} companyName={companyName}/>
      </Provider>,
    document.getElementById(containerId));
  }
  else {
    console.error("Provided container node doesn't exist");
  }
};

export default BasiqConnect;