import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ImagePreloader from "./ui/ImagePreloader";
import pages from "./pages";

import redWarning from "../assets/images/redWarning.svg";
import greenWarning from "../assets/images/greenWarning.svg";

import "./ViewContainer.css";

const ViewContainer = ({ children, error, resendMessage, currentPage }) => {

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("basiqConnectMounted"));
    }, [])

  return (
    <div className="vc-outer-container">
      <div className="vc-container vc-container-size">
        <ImagePreloader />
        {error && currentPage !== pages.InvalidUrlPage ? (
          <div className="vc-error-row">
            <div className="vc-img-wrapper">
              <img src={redWarning} alt="Warning icon" />
            </div>
            <div>{error}</div>
          </div>
        ) : resendMessage ? (
          <div className="vc-error-row vc-resend-message-row">
            <div className="vc-img-wrapper">
              <img src={greenWarning} alt="Warning icon" />
            </div>
            <div>{resendMessage}</div>
          </div>
        ) : null}
        <div className="vc-content-row vc-white-box">{children}</div>
      </div>
    </div>
  );
};

ViewContainer.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
export default connect(mapStateToProps)(ViewContainer);
