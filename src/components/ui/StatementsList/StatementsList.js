import React from "react";

import TickIcon from "../../../assets/images/tick.svg";
import WarningIcon from "../../../assets/images/warning.svg";
import pdfIcon from "../../../assets/images/pdf.svg";
import greyCancelIcon from "../../../assets/images/grey-x.svg";

import { StatementStatus } from "../../../reducers/initialState";

import "./StatementsList.css";

const StatementsList = ({ statements, fileRemoved }) => {
  return (
    <div className="sl-statements-list">
      {statements
        .sort(function(a, b) {
          return a.id - b.id;
        })
        .map(statement => (
          <div className="sl-statement-container">
            <div className="sl-statement">
              <img className="sl-pdf-icon" src={pdfIcon} alt="pdf" />
              {statement.filename.length > 25 ? statement.filename.substr(0, 25).trim() + "..." : statement.filename}
              {statement.status === StatementStatus.UPLOADING ? (
                <div className="sl-upload-status-icon">
                  <div className="sl-loading-spinner sl-blue-spinner" style={{ marginLeft: "10px" }} />
                </div>
              ) : statement.status === StatementStatus.SUCCESS ? (
                <div className="sl-upload-status-icon">
                  <img src={TickIcon} style={{ marginLeft: "10px" }} alt="Success" />
                </div>
              ) : statement.status === StatementStatus.FAILURE ? (
                <div className="sl-upload-status-icon">
                  <img src={WarningIcon} style={{ marginLeft: "10px" }} alt="Failure" />
                </div>
              ) : (
                <div className="sl-upload-status-icon sl-cancel-icon">
                  <img src={greyCancelIcon} alt="Cancel" onClick={() => fileRemoved(statement.id)} />
                </div>
              )}
            </div>
            {statement.errorMessage ? (
              <label className="sl-upload-error-label sl-show-error-label">{statement.errorMessage}</label>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default StatementsList;
