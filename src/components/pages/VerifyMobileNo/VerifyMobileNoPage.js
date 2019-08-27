import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../actions/basiqConnectAction";

import MainButton from "../../ui/MainButton/MainButton";
import NumericCodeInputs from "../../ui/NumericCodeInputs/NumericCodeInputs";

import "./VerifyMobileNoPage.css";

const VerifyMobileNoPage = ({ mobile, smsCode, smsCodeValid, resendSmsCodeVerification,
  smsCodeChangedActionCreator, sendingSmsCode, verifySmsCode, authRequestId }) => (
  <div className="page-container">
    <span className="vm-title">Verify Mobile Number</span>

    <div className="vm-subtitle">
      Please enter the SMS code sent to your mobile number (ending xxx{mobile}).
    </div>

    <NumericCodeInputs
      smsCode={smsCode}
      smsCodeValid={smsCodeValid}
      resendSmsCodeVerification={resendSmsCodeVerification}
      changeSmsCode={smsCodeChangedActionCreator}
      verifySmsCodeExecute={verifySmsCode}
      authRequestId={authRequestId}
      />

    <div className="vm-footnote-bottom">
      <MainButton id="vm-sms-code-button" onClick={() => verifySmsCode(authRequestId, smsCode.join(""))}
        disabled={!smsCodeValid} text="Continue" loading={sendingSmsCode} />
    </div>
  </div>
);

VerifyMobileNoPage.propTypes = {
  resendSmsCodeVerification: PropTypes.func,
  smsCodeChangedActionCreator: PropTypes.func,
  smsCode: PropTypes.array,
  smsCodeValid: PropTypes.bool,
  verifySmsCode: PropTypes.func,
  mobile: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMobileNoPage);
