import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SuccessIcon from "../../../assets/images/Mark_Circle-512.png";

import "./SuccessPage.css";

const ThankYouPage = ({ partnerName }) => (
  <div className="page-container">
    <div className="su-title">Thank You</div>
    <div className="su-icon-position">
      <img className="su-icon" src={SuccessIcon} alt="success icon" />
    </div>
    <div className="su-message">Your financial data has been successfully shared with {partnerName}.</div>
  </div>
);

ThankYouPage.propTypes = {
  partnerName: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;

export default connect(mapStateToProps)(ThankYouPage);
