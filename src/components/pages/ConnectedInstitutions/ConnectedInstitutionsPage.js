import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions/basiqConnectAction";

import pages from "../index.js";
import MainButton from "../../ui/MainButton/MainButton";

import ShieldIcon from "../../../assets/images/shield.png";
import SuccessIcon from "../../../assets/images/success.png";


import "./ConnectedInstitutionsPage.css";

const listItems = (institutionList) => institutionList.map((item, index) => (
  <div className="cdi-institution-list-item" key={index}>
    <img
      style={{ width: 20, height: 20, display: "inline-block", marginRight: 15 }}
      src={item.icon}
      alt="item icon"
    />
    <label style={{ width: "100%" }}>
      {item.name}
    </label>
    <img
      style={{ width: 20, height: 20, float: "right" }}
      src={SuccessIcon}
      alt="Shiled icon"
    />
  </div>
));

const ConnectedInstitutionsPage = ({ navigateToActionCreator, institutionList,
  showBankConnect, userId, accessToken, connectSupported, uploadSupported, disableAuthLink }) => (
  <div className="page-container">

    <div className="cdi-title">Connect to Bank</div>

    <div className="cdi-subtitle">Select the button below to connect your financial institutions.</div>

    <div className="cdi-institution-list">{listItems(institutionList)}</div>

    <div className="cdi-page-content">
      <div className="cdi-centered-bold-text">
        Do you bank with anyone else?
      </div>
      <div className="cdi-text-button">
        <span id="cdi-show-bank-connect-button"
          onClick={() => showBankConnect({userId, accessToken, connectSupported, uploadSupported})}>
          Connect another bank
        </span>
      </div>
    </div>

    <div className="cdi-footnote-bottom">
      <div className="cdi-footnote-text">
        <img
          className="cdi-footnote-icon"
          src={ShieldIcon}
          alt="Shiled icon"
        />
        Your data is protected using 256-bit encryption.
      </div>
      <MainButton id="cdi-inst-list-button"
        onClick={disableAuthLink} text="I have disclosed all banks" />
    </div>
  </div>
);

ConnectedInstitutionsPage.propTypes = {
  navigateToActionCreator: PropTypes.func,
  institutionList: PropTypes.array,
  showBankConnect: PropTypes.func,
  userId: PropTypes.string,
  accessToken: PropTypes.string,
  connectSupported: PropTypes.bool,
  uploadSupported: PropTypes.bool,
  disableAuthLink: PropTypes.func
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedInstitutionsPage);
