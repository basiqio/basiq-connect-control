import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "63d1c003-011e-4d8d-a186-08a32ece4779",
      companyName: "blah"
    });
    /*
    BasiqConnect({containerId: "basiq-connect-container",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiI4YzdmNDExYy1mNzUxLTQ0MmMtOTY5YS1lOGViZTgwMDNiMWQiLCJhcHBsaWNhdGlvbmlkIjoiNjdhNDdmNGEtMjYwNS00YTU1LThlN2QtMTVkYmFmNWFmZGM0Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiY29ubmVjdF9zdGF0ZW1lbnRzIjp0cnVlLCJhZmZvcmRhYmlsaXR5IjoicGFpZCIsImluY29tZSI6InBhaWQiLCJleHBlbnNlcyI6InBhaWQiLCJleHAiOjE1NzMyMDQ1MjgsImlhdCI6MTU3MzIwMDkyOCwidmVyc2lvbiI6IjIuMCJ9.P-ssBzaFXdXZIjAh1IfLsl83nzd5LryD-_bojcvd7UI",
      userID: "0a37ab92-f0f2-4c77-ac0f-643d92616a52",
      connectLinkId: "",
      companyName: "Lalalal",
      regionOfInstitutions: "Australia"
      })*/
  }

  render() {
    return <div className="vc-inner-container">
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;