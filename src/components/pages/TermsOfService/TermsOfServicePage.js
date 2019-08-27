import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions/basiqConnectAction";
import pages from "../index.js";

import MainButton from "../../ui/MainButton/MainButton";

import "./TermsOfServicePage.css";

const BASIQ_TERMS_OF_SERVICE_LINK = "http://docs.basiq.io/pricing-privacy-and-terms/basiq-terms-of-service";
const BASIQ_PRIVACY_POLICY_LINK = "http://docs.basiq.io/articles/382581-basiq-privacy-policy";

const TermsOfServicePage = ({
  partnerName,
  requestSmsCodeVerification,
  authenticationRequired,
  navigateToActionCreator,
  authRequestId
}) => (
  <div className="page-container">
    <div className="te-title">{partnerName}</div>

    <div className="te-subtitle">
      To complete your application we're going to ask you to share your financial data with us.
    </div>
    <div className="te-divider" />

    <div className="te-page-content">
      <div>
        To do this, we'll ask you to:
        <ul className="te-ul">
          {authenticationRequired ? (
            <li>
              <strong>Verify</strong> your mobile no
            </li>
          ) : null}
          <li>
            <strong>Consent</strong> to share your data with us
          </li>
          <li>
            <strong>Share</strong> your financial data
          </li>
        </ul>
      </div>
    </div>

    <div className="te-footnote-bottom">
      <div className="te-footnote-text">
        By proceeding, you agree to the{" "}
        <a
          className="te-link"
          id="tosLink"
          href={BASIQ_TERMS_OF_SERVICE_LINK}
          target="_blank"
          rel="noreferrer noopener"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a className="te-link" id="ppLink" href={BASIQ_PRIVACY_POLICY_LINK} target="_blank" rel="noreferrer noopener">
          Privacy Notice
        </a>
        .
      </div>
      <MainButton
        id="te-continue-button"
        onClick={
          authenticationRequired
            ? () => requestSmsCodeVerification(authRequestId)
            : () => navigateToActionCreator(pages.ConsentPage)
        }
        text="Continue"
      />
    </div>
  </div>
);

TermsOfServicePage.propTypes = {
  partnerName: PropTypes.string,
  requestSmsCodeVerification: PropTypes.func,
  authenticationRequired: PropTypes.bool
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfServicePage);
