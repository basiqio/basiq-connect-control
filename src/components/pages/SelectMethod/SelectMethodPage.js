import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../../../actions/basiqConnectAction";
import { ConnectMethod } from "../../../reducers/initialState";
import pages from "../index";

import ShieldIcon from "../../../assets/images/shield.png";
import uploadCloud from "../../../assets/images/uploadCloud.svg";
import bankConnect from "../../../assets/images/bankConnect.svg";

import "./SelectMethodPage.css";

const SelectMethodPage = ({ connectMethodSelected, navigateToActionCreator, institutionList }) => (
  <div className="page-container">
    <div className="sm-title">
      <span className="sm-back-icon" onClick={() =>
        institutionList.length === 0 ?
          navigateToActionCreator(pages.ConnectInstitutionPage) :
          navigateToActionCreator(pages.ConnectedInstitutionsPage)}>
            ‹
      </span>
      <p>How will you share?</p>
      <div style={{width:"38px"}}></div>
    </div>

    <div className="sm-question">
      Select how you would like to share your financial data.
    </div>

    <div className="sm-shared-container">
      <div className="sm-bank-connect-container"
        onClick={() => connectMethodSelected(ConnectMethod.CONNECT)}>
        <div className="sm-img-container">
          <img src={bankConnect} alt="Connect" />
        </div>

        <div className="sm-share-method-container">
          <span className="sm-method-name">Bank Connect</span><span className="sm-fast">FASTEST</span>
          <div className="sm-method-subtitle">Securely retrieve financial data directly from your bank</div>
        </div>
      </div>
      <div className="sm-upload-cloud-container"
        onClick={() => connectMethodSelected(ConnectMethod.UPLOAD)}>
        <div className="sm-img-container">
          <div>
            <img src={uploadCloud} alt="Upload" />
          </div>
        </div>

        <div className="sm-share-method-container">
          <span className="sm-method-name">Upload Bank Statements</span>
          <div className="sm-method-subtitle">Easily upload and share your bank statements</div>
        </div>
      </div>
    </div>

    <div className="sm-bottom-container">
      <div className="sm-footnote-text">
        <img
          className="sm-footnote-icon-size"
          src={ShieldIcon}
          alt="Shiled icon" />
        Your data is protected using 256-bit encryption.
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectMethodPage);
