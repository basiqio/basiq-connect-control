import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions/basiqConnectAction";

import pages from "../index.js";

import MainButton from "../../ui/MainButton/MainButton";
import InputField from "../../ui/InputField/InputField";

import "./ProvideCredentialsPage.css";

const ProvideCredentialsPage = ({
  selectedInstitution,
  navigateToActionCreator,
  loginId,
  secondaryLoginId,
  password,
  securityCode,
  loginIdError,
  passwordError,
  securityCodeError,
  secondaryLoginIdError,
  loginIdChanged,
  secondaryLoginIdChanged,
  passwordChanged,
  securityCodeChanged,
  connectToBank
}) => {
  return (
    <div className="page-container" onKeyPress={(e) => e.which === 13 ?
      connectToBank(selectedInstitution, selectedInstitution.id, loginId,
        password, securityCode, secondaryLoginId) : null}>
      <span className="pc-title">
        <span className="pc-back-icon" onClick={() => navigateToActionCreator(pages.SelectInstitutionPage)}>‹</span>
        <p>Login</p>
        <div style={{width:"38px"}}></div>
      </span>
      <div className="pc-institution-logo">
        <img
          id="pc-logo"
          src={selectedInstitution.logo.links.full}
          alt={selectedInstitution.shortName}
        />
      </div>
      <div className="pc-form-container">
        <form className="pc-form" autoComplete="off">
          <InputField
            id="pc-login-id"
            placeholder={selectedInstitution.loginIdCaption}
            type="text"
            value={loginId}
            onChange={e => loginIdChanged(e.target.value)}
            errorMessage={loginIdError}
          />
          {selectedInstitution.secondaryLoginIdCaption ? (
            <InputField
              id="pc-secondary-login-id"
              placeholder={selectedInstitution.secondaryLoginIdCaption}
              type="text"
              value={secondaryLoginId}
              onChange={e => secondaryLoginIdChanged(e.target.value)}
              errorMessage={secondaryLoginIdError}
            />
          ) : null}
          <InputField
            id="pc-password"
            placeholder={selectedInstitution.passwordCaption}
            type="password"
            toggleable={true}
            value={password}
            onChange={e => passwordChanged(e.target.value)}
            errorMessage={passwordError}
          />
          {selectedInstitution.securityCodeCaption ? (
            <InputField
              id="pc-security-code"
              placeholder={selectedInstitution.securityCodeCaption}
              type="password"
              toggleable={true}
              value={securityCode}
              onChange={e => securityCodeChanged(e.target.value)}
              errorMessage={securityCodeError}
            />
          ) : null}
        </form>
      </div>
      <div className="pc-footnote-bottom">
        <MainButton
          id="pc-submit-button"
          text="Continue"
          onClick={() =>
            connectToBank(
              selectedInstitution,
              selectedInstitution.id,
              loginId,
              password,
              securityCode,
              secondaryLoginId
            )
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

ProvideCredentialsPage.propTypes = {
  selectedInstitution: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProvideCredentialsPage);
