import React from "react";
import PropTypes from "prop-types";
import "./MainButton.css";

const MainButton = props => {
  return (
    <button
      id={props.id}
      className={props.disabled ? "main-button main-button-disabled" : "main-button"}
      onClick={props.disabled ? e => e.preventDefault() : props.onClick}
      style={props.style}
    >
      <span className={props.loading ? "icon" : "main-button-force-hide"}>
        <i className="fa fa-spinner fa-spin" />
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


