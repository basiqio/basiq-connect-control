import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    /*BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "0b3a1a45-f310-415a-a520-ebae47a563f0"
    });
    */
    BasiqConnect({containerId: "basiq-connect-container",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiIzZDRiODlkOC0wOWY1LTRiMGItODgxMC1hY2UwNzI5NWE4ODUiLCJhcHBsaWNhdGlvbmlkIjoiY2IzOTFkMDgtMDljNy00MDdhLTkwMTYtMjI1MjY3MzhiOWFlIiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50Ijp0cnVlLCJhZmZvcmRhYmlsaXR5IjoicGFpZCIsImluY29tZSI6InBhaWQiLCJleHBlbnNlcyI6InBhaWQiLCJleHAiOjE1NzMyMzA5NTAsImlhdCI6MTU3MzIyNzM1MCwidmVyc2lvbiI6IjIuMCJ9.QDU4VK7KrMburkzmvaU8BPCMbSUP92qmAllqLB_Zqeo",
      userID: "e5aedda2-b7b3-4b32-b311-27d8df5127a2",
      connectLinkId: "",
      companyName: "Lalalal",
      regionOfInstitutions: "Australia"
      })
  }

  render() {
    return <div className="vc-inner-container">
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;