import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../actions/basiqConnectAction";

import pages from "../index.js";

import InstitutionTumbnail from "../../ui/InstitutionThumbnail/InstitutionThumbnail";

import "./SelectInstitutionPage.css";

const ESUPERFUND_PARTNER_ID = "8f6d03ae-e2ca-4bc9-950d-53f20b30ba73";

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

  getPartnerId(token) {
    try {
      return JSON.parse(atob(token.split(".")[1])).partnerid;
    } catch (e) {
      return null;
    }
  }

  render() {
    const { navigateToActionCreator, accessToken, institutionSelected,
      institutions, connectSupported, uploadSupported, hideTestBanks} = this.props;
    return (
      <div className="page-container">
        <div className="si-title">
          <span className="si-back-icon" onClick={() => connectSupported && uploadSupported ?
            navigateToActionCreator(pages.SelectMethodPage) :
            navigateToActionCreator(pages.ConnectedInstitutionsPage)}>‹</span>
          <p>Select your bank</p>
          <div style={{width:"38px"}}></div>
        </div>
        <input
          className="si-search"
          type="text"
          placeholder="Search Banks"
          onChange={this.handleSearchInputChange}
        />
        <div className="si-list">
          <div className="si-upper-buffer" />
          {institutions.length !== 0
            ? institutions
              .filter(
                institution =>
                  // Removing test institutions if partner is eSuperfund
                  (this.getPartnerId(accessToken) === ESUPERFUND_PARTNER_ID || hideTestBanks ?
                    (institution.id !== "AU00000" && institution.id !== "AU00001") : true) &&
                  (institution.shortName.toUpperCase().includes(this.state.searchString) ||
                  institution.name.toUpperCase().includes(this.state.searchString))
              )
              .map(institution => (
                <InstitutionTumbnail
                  institution={institution}
                  key={`${institution.id}`}
                  onInstitutionSelected={i => institutionSelected(i)}
                  allwaysShowName={this.state.searchString.length > 0}
                />
              ))
            : null}

          <div className="si-lower-buffer" />
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
