import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./InvalidUrlPage.css";

const InvalidUrlPage = ({ error }) => (
  <div className="iu-container">
    <div className="iu-content-row">
      {error === "Invalid SMS" ? <div className="page-container">
        <div className="iu-title">Failed SMS verification.</div>
        <div style={{ "marginBottom": "20px" }}>Basiq Connect link is no longer valid.</div>
        <div>Please contact the financial institution that sent you your link in order to generate a new one.</div>
      </div> :
        error === "Authorization failed" ?
          <div className="page-container">
            <div className="iu-title">We looked for your page but couldn't find it.</div>
            <div style={{ "marginBottom": "20px" }}>The page you tried to access doesn't exist.</div>
            <div>If you still cannot access the page, please contact your
              financial service partner because your authorization failed.</div>
          </div>
          : <div className="page-container">
            <div className="iu-title">We looked for your page but couldn't find it.</div>
            <div style={{ "marginBottom": "20px" }}>The page you tried to access doesn't exist.</div>
            <div>If you still cannot access the page, please contact your
              financial service partner and request a new link to be sent.</div>
          </div>
      }
    </div>
  </div>
);

InvalidUrlPage.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
export default connect(mapStateToProps)(InvalidUrlPage);
