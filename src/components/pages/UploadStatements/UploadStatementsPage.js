import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions/basiqConnectAction";

import pages from "../index.js";

import Upload from "../../ui/Upload/Upload";
import MainButton from "../../ui/MainButton/MainButton";
import StatementsList from "../../ui/StatementsList/StatementsList";

import { StatementStatus } from "../../../reducers/initialState";

import "./UploadStatementsPage.css";

const statementsUploaded = (statements) => {
  return (!statements.some(function(statement) {
    return statement.status === StatementStatus.ADDED ||
           statement.status === StatementStatus.UPLOADING;
  }) &&
        statements.some(function(statement) {
          return statement.status === StatementStatus.SUCCESS;
        }));
};

const statementsUploading = (statements) => {
  return statements.some(statement => statement.status === StatementStatus.UPLOADING);
};

const statementsInvalid = (statements) => {
  if (statements.length === 0) {
    return false;
  }

  return statements.every(function(statement) {
    return statement.status === StatementStatus.FAILURE ||
           statement.status === StatementStatus.UNSUPPORTED;
  });
};

const UploadStatementsPage = ({
  statements,
  fileAdded,
  selectedInstitution,
  uploadPageFinished,
  navigateToActionCreator,
  unsupportedFileDropped,
  largeFileDropped,
  fileRemoved,
  uploadStatements
}) => {
  return (
    <div className="us-statements-container">
      <div className="us-upload-stat-header">
        <div className="us-upload-stat-method-select-title">
          <span className="us-back-icon"
            style={statementsUploading(statements) ? {color : "gray"} : null}
            onClick={!statementsUploading(statements) ?
              () => navigateToActionCreator(pages.SelectInstitutionPage) : null}>
            ‹
          </span>
          <p>Upload Statements</p>
          <div style={{width:"38px"}}></div>
        </div>
        <div className="us-upload-bank-logo-container">
          <img id="us-upload-bank-logo" src={selectedInstitution.logo.links.full} alt={selectedInstitution.shortName} />
        </div>
      </div>
      <div className="us-statements-content">
        <StatementsList statements={statements} fileRemoved={fileRemoved} />
        <div
          className={statements.length === 0 ?
            "us-upload-stat-upload-container" : "us-upload-stat-small-upload-container"}
        >
          <Upload
            text="We support only official statements downloaded directly from your banking institution"
            fileAdded={fileAdded}
            institutionId={selectedInstitution.id}
            filetypes={["application/pdf", "text/csv", "text/comma-separated-values"]}
            extensions={["pdf", "csv"]}
            shrink={statements.length === 0 ? false : true}
            unsupportedFileDropped={unsupportedFileDropped}
            largeFileDropped={largeFileDropped}
          />
        </div>
        {statementsUploaded(statements) ? (
          <div className="us-footnote-bottom">
            <MainButton id="us-continue-button" onClick={() => uploadPageFinished()} text="Continue" />
          </div>
        ) : statementsInvalid(statements) ? (
          <div className="us-footnote-bottom">
            <MainButton
              id="us-continue-button"
              onClick={() => navigateToActionCreator(pages.ConnectInstitutionPage)}
              text="Continue"
            />
          </div>
        ) : statements.length ? (
          <div className="us-footnote-bottom">
            <MainButton id="us-upload-button" text="Upload" disabled={statementsUploading(statements)}
              onClick={() => uploadStatements({ statements })} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

Upload.propTypes = {
  fileAdded: PropTypes.func,
  filenames: PropTypes.array,
  selectedInstitution: PropTypes.object,
  unsupportedFileDropped: PropTypes.func,
  largeFileDropped: PropTypes.func,
  fileRemoved: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadStatementsPage);
