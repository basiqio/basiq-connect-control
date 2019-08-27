import React from "react";
import PropTypes from "prop-types";

import "./InstitutionThumbnail.css";

class InstitutionThumbnail extends React.Component {
  constructor() {
    super();

    this.state = {
      showName: false
    };
  }

  mouseEnter = () => {
    this.setState({ showName: true });
  }
  mouseLeave = () => {
    this.setState({ showName: false });
  }

  render() {
    return (
      <div className="institution-thumb-cont"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={() => this.props.onInstitutionSelected(this.props.institution)}>
        <img className="institution-thumb-img"
          src={this.props.institution.logo.links.square}
          alt={this.props.institution.shortName} />
        {this.state.showName ?
          <span className="institution-thumb-name">{this.props.institution.shortName}</span> : null}
      </div>
    );
  }
}

InstitutionThumbnail.propTypes = {
  institution: PropTypes.object.isRequired,
};

export default InstitutionThumbnail;
