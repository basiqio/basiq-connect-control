import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    /*BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "f6ce7c58-7f5f-4df7-a8f6-10ce49e9e162",
      companyName: "Persida",
      showTestBanks: false
    });
    */
    BasiqConnect({containerId: "basiq-connect-container",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiI4YzdmNDExYy1mNzUxLTQ0MmMtOTY5YS1lOGViZTgwMDNiMWQiLCJhcHBsaWNhdGlvbmlkIjoiNjdhNDdmNGEtMjYwNS00YTU1LThlN2QtMTVkYmFmNWFmZGM0Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiY29ubmVjdF9zdGF0ZW1lbnRzIjp0cnVlLCJhZmZvcmRhYmlsaXR5IjoicGFpZCIsImluY29tZSI6InBhaWQiLCJleHBlbnNlcyI6InBhaWQiLCJleHAiOjE1NzMxNDA5MzgsImlhdCI6MTU3MzEzNzMzOCwidmVyc2lvbiI6IjIuMCJ9.zgpnnI3tNk2LiBqOPHrSdKJIQyTQv9jAOFUZjV4FxTw",
      userID: "0a37ab92-f0f2-4c77-ac0f-643d92616a52",
      connectLinkId: "",
      companyName: "Lalalal",
      regionOfInstitutions: "Australia",
      showTestBanks: true
      })
  }

  render() {
    return <div className="vc-inner-container">
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;