import React from "react";
import PropTypes from "prop-types";
import "./InputField.css";

const InputField = props => {
  return (
    <div className={!props.disabled ? props.inputFieldWrap : `${props.inputFieldWrap} disabled`}>
      <label className="labelInput" htmlFor={props.id ? props.id : "input-field"}>
        {props.label}
      </label>
      <div className={!props.errorMessage ? "inputFieldWrap" : "inputFieldWrap has-error"}>
        {props.autofocus ? (
          <input
            id={props.id}
            className={props.toggleable || props.canBeCopied ? "inputField input-with-content" : "inputField"}
            type={props.type}
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onBlur={props.onBlurAction}
            maxLength={props.maxLength}
            onFocus={props.onFocusAction}
            autoFocus
          />
        ) : (
          <input
            id={props.id}
            className={props.toggleable || props.canBeCopied ? "inputField input-with-content" : "inputField"}
            type={props.type}
            name={props.name}
            label={props.label}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
            onBlur={props.onBlurAction}
            maxLength={props.maxLength}
            autoComplete={props.autoComplete}
            onFocus={props.onFocusAction}
          />
        )}
      </div>
      {
        <label
          className={!props.errorMessage ? "error-label hide-error-label" : "error-label show-error-label"}
          htmlFor={props.id ? props.id : "inputField"}
        >
          {props.errorMessage}
        </label>
      }
      {
        <label
          className={!props.warningMessage ? "warning-label hide-error-label" : "warning-label show-error-label"}
          htmlFor={props.id ? props.id : "inputField"}
        >
          {props.warningMessage}
        </label>
      }
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  toggleable: PropTypes.bool,
  canBeCopied: PropTypes.bool,
  type: PropTypes.oneOf(["text", "password"]).isRequired,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  inputFieldWrap: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  onBlurAction: PropTypes.func,
  autoComplete: PropTypes.string,
  onFocusAction: PropTypes.func
};

export default InputField;
