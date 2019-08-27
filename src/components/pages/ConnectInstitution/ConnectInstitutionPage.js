import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../../../actions/basiqConnectAction";

import MainButton from "../../ui/MainButton/MainButton";

import ShieldIcon from "../../../assets/images/shield.png";

import "./ConnectInstitutionPage.css";

const ConnectInstitution = ({ showBankConnect, userId, accessToken, connectSupported, uploadSupported }) => (
  <div className="page-container">
    <div className="ci-title">Connect to Bank</div>
    <div className="ci-subtitle">Select the button below to connect your financial institutions.</div>
    <div className="ci-divider" />

    <div className="ci-connect-notice">
      For faster approval please ensure you disclose all of your financial
      institutions - including credit cards and loans.
      {connectSupported}
      {uploadSupported}
    </div>

    <div className="ci-footnote-bottom">
      <div className="ci-footnote-text">
        <img
          className="ci-footnote-icon"
          src={ShieldIcon}
          alt="Shiled icon"
        />
        Your data is protected using 256-bit encryption.
      </div>
      <MainButton id="ci-connect-button"
        onClick={() => showBankConnect({userId, accessToken, connectSupported, uploadSupported})} text="Connect Bank" />
    </div>
  </div>
);

ConnectInstitution.propTypes = {
  showBankConnect: PropTypes.func,
  userId: PropTypes.string,
  accessToken: PropTypes.string,
  connectSupported: PropTypes.bool,
  uploadSupported: PropTypes.bool
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectInstitution);
