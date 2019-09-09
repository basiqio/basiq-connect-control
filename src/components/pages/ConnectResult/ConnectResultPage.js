import React from "react";
import PropTypes from "prop-types";
import * as actions from "../../../actions/basiqConnectAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import pages from "../index.js";
import { ConnectResult } from "../../../reducers/initialState";

import MainButton from "../../ui/MainButton/MainButton";
import BounceAnimation from "../../ui/SpinnerAnimation/SpinnerAnimation";

import successImage from "../../../assets/images/tick.svg";
import failureImage from "../../../assets/images/cancel-icon.svg";

import "./ConnectResultPage.css";


const ConnectResultPage = ({ connectResult, bankConnectFinished, navigateToActionCreator }) => {
  let title = "Connecting...";
  let illustration = <BounceAnimation />;
  let subtitle = "Retriving data...";

  if (connectResult === ConnectResult.SUCCESS) {
    title = "Success";
    illustration = <img style={{width: "96px"}} src={successImage} alt="Success"/>;
    subtitle = "Your data has been successfully submitted.";
  } else if (connectResult === ConnectResult.FAILURE) {
    title = "Error";
    illustration = <img style={{width: "96px"}} src={failureImage} alt="Failure"/>;
    subtitle = "Error connecting to bank.";
  }

  return (
    <div className="page-container">
      <div className="cr-title">
        {connectResult === ConnectResult.FAILURE ? (
          <span className="cr-back-icon" onClick={() => navigateToActionCreator(pages.ProvideCredentialsPage)}>‹</span>
        ) : null}
        {title}
      </div>
      <div className="cr-result-container">
        <div>
          {illustration}
          <div className="cr-text">{subtitle}</div>
        </div>
      </div>

      <div className="cr-footnote-bottom">
        <MainButton
          id="cr-continue-button"
          disabled={connectResult.length === 0}
          text="Continue"
          onClick={() => bankConnectFinished()}
        />
      </div>
    </div>
  );
};

ConnectResultPage.propTypes = {
  partnerName: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectResultPage);
