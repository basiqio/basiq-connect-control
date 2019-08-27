import React from "react";
import { connect } from "react-redux";

import redWarning from "../../assets/images/redWarning.svg";
import greenWarning from "../../assets/images/greenWarning.svg";
import uploadCloud from "../../assets/images/uploadCloud.svg";
import bankConnect from "../../assets/images/bankConnect.svg";

const ImagePreloader = ({institutions}) => {
  return (
    <div>
      <img src={greenWarning} alt="Green Warning icon" style={{ "display": "none" }} />
      <img src={redWarning} alt="Red Warning icon" style={{ "display": "none" }} />
      <img src={uploadCloud} alt="Upload Cloud icon" style={{ "display": "none" }} />
      <img src={bankConnect} alt="Bank Connect icon" style={{ "display": "none" }} />
      {institutions && institutions.length !== 0 ?
        institutions.map(institution =>
          <div key={institution.id}>
            <img src={institution.logo.links.square} alt="Intitution Logo" style={{ "display": "none" }} />
            <img src={institution.logo.links.full} alt="Intitution Logo" style={{ "display": "none" }} />
          </div>) : null}
    </div>
  );
};

const mapStateToProps = ({ basiqConnect }) => basiqConnect;
export default connect(mapStateToProps)(ImagePreloader);
