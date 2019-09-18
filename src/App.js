import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as actions from "./actions/basiqConnectAction";

import pages from "./components/pages";

import ViewContainer from "./components/ViewContainer";

class App extends React.Component {
  componentDidMount() {
    if(this.props.token !== undefined &&
       this.props.token !== "" &&
       this.props.userID !== undefined &&
       this.props.userID !== "") {
      this.props.validateToken({token: this.props.token, userId: this.props.userID,
        connect: this.props.connect, upload: this.props.upload, partnerName: this.props.companyName});
      this.props.fetchInstitutions();
    } else if(this.props.connectLink !== undefined && this.props.connectLink !== ""){
      this.props.validateAuthRequestId({connectLink: this.props.connectLink,
        connect: this.props.connect, upload: this.props.upload,
        partnerName: this.props.companyName, institutionRegion: this.props.regionOfInstitutions });
      this.props.fetchInstitutions();
    } else {
      // eslint-disable-next-line no-console
      console.error("BASIQ CONNECT CONTROL ERROR: You have to provide authentication id or user id and access token.");
      this.props.authorizationFailed();
    }
  }

  render() {
    const { currentPage, navigateToActionCreator } = this.props;
    if (!currentPage) {
      return null;
    }
    const TagName = currentPage;

    if (TagName === pages.InvalidUrlPage) {
      return <TagName navigateToActionCreator={navigateToActionCreator} />;
    }

    return (
      <ViewContainer>
        <TagName navigateToActionCreator={navigateToActionCreator} />
      </ViewContainer>
    );
  }
}

App.propTypes = {
  currentPage: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  navigateToActionCreator: PropTypes.func,
  connectLink: PropTypes.string,
  token: PropTypes.string,
  userID: PropTypes.string,
  connect: PropTypes.bool,
  upload: PropTypes.bool,
  companyName: PropTypes.string
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
