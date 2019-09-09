import React from "react";
import "./NumericCodeInputs.css";

class NumericCodeInputs extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDownPress = this.handleKeyDownPress.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    for (const x in this.refs) {
      this.refs[x].onkeydown = (e) =>
        this.handleKeyDownPress(e, this.refs[x], x);
    }
  }

  handleKeyDownPress(e, field, name) {
    let inputToBeSelected = null;
    
    if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) { // Numbers 0-9.
      
      this.props.changeSmsCode({ index: name[name.length - 1], value: String.fromCharCode(e.which) });
      inputToBeSelected = this.refs[field.name].nextSibling;

    } else if (e.which === 8) { // Backspace.
      const index = parseInt(name[name.length - 1]);

      if (field.name === "number3" && field.value !== "") {
        this.props.changeSmsCode({ index, value: "" });
      } else if (field.name !== "number0") {
        this.props.changeSmsCode({ index: index - 1, value: "" });
        inputToBeSelected = this.refs[field.name].previousSibling;
      }

    } else if (e.which === 37) { // Left
      inputToBeSelected = this.refs[field.name].previousSibling;
    } else if (e.which === 39) { // Right.
      inputToBeSelected = this.refs[field.name].nextSibling;
    } else if (e.which === 13 && this.props.smsCodeValid) { // Enter.
      this.props.verifySmsCodeExecute(this.props.authRequestId, this.props.smsCode.join(""));
    }

    if (inputToBeSelected && inputToBeSelected.tagName === "INPUT") {
      inputToBeSelected.focus();
    }
  }

  render() {
    const { smsCode, resendSmsCodeVerification, authRequestId } = this.props;
    return (
      <div className="nc-container">
        <form className="nc-numeric-code" autoComplete="off">
          <input type="tel" maxLength="1" className="nc-number"
            name="number0" id="number0" ref="number0" value={smsCode[0]} autoFocus={true} />
          <input type="tel" maxLength="1" className="nc-number"
            name="number1" id="number1" ref="number1" value={smsCode[1]} />
          <input type="tel" maxLength="1" className="nc-number"
            name="number2" id="number2" ref="number2" value={smsCode[2]} />
          <input type="tel" maxLength="1" className="nc-number"
            name="number3" id="number3" ref="number3" value={smsCode[3]} />
        </form>
        <div className="nc-text-button">
          <span id="nc-resend-sms-button" onClick={() => resendSmsCodeVerification(authRequestId)}>Resend SMS</span>
        </div>
      </div>
    );
  }
};

export default NumericCodeInputs;
