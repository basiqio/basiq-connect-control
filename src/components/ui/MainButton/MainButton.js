import React from "react";
import PropTypes from "prop-types";

import spinner from "../../../assets/images/spinner-of-dots.svg";

import "./MainButton.css";

const MainButton = props => {
  return (
    <button
      id={props.id}
      className={props.disabled ? "main-button main-button-disabled" : "main-button"}
      onClick={props.disabled ? e => e.preventDefault() : props.onClick}
      style={props.style}
    >
      <span className={props.loading ? "" : "main-button-force-hide"}>
        <img src={spinner} className="main-button-spinner" alt="spinner" />
      </span>
      {props.text}
    </button>
  );
};

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  id: PropTypes.string
};

export default MainButton;


