import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../actions/basiqConnectAction";

import pages from "../index.js";

import InstitutionTumbnail from "../../ui/InstitutionThumbnail/InstitutionThumbnail";

import "./SelectInstitutionPage.css";

class SelectInstitutionPage extends React.Component {
  constructor() {
    super();

    this.state = {
      searchString: ""
    };
  }

  handleSearchInputChange = event => {
    this.setState({
      searchString: event.target.value.toUpperCase()
    });
  };

  render() {
    const { navigateToActionCreator, institutionSelected, institutions, connectSupported, uploadSupported } = this.props;
    return (
      <div className="page-container">
        <div className="ci-title">
          <span className="ci-back-icon" onClick={() => connectSupported && uploadSupported ? navigateToActionCreator(pages.SelectMethodPage) : navigateToActionCreator(pages.ConnectInstitutionPage)}>‹</span>
          Select your bank
        </div>
        <input
          className="ci-search"
          type="text"
          placeholder="Search Banks"
          onChange={this.handleSearchInputChange}
        />
        <div className="ci-list">
          <div className="ci-upper-buffer" />

          {institutions.length !== 0
            ? institutions
              .filter(
                institution =>
                  institution.shortName.toUpperCase().includes(this.state.searchString) ||
                  institution.name.toUpperCase().includes(this.state.searchString)
              )
              .map(institution => (
                <InstitutionTumbnail
                  institution={institution}
                  key={`${institution.id}`}
                  onInstitutionSelected={i => institutionSelected(i)}
                />
              ))
            : null}

          <div className="ci-lower-buffer" />
        </div>
      </div>
    );
  }
}

SelectInstitutionPage.propTypes = {
  institutions: PropTypes.array
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectInstitutionPage);
