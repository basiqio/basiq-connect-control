import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    
    BasiqConnect({containerId: "basiq-connect-container",
      connectLinkId: "4c6638f4-06d6-413c-a8de-0c75e8e64ef5",
      regionOfInstitutions: "Australia",
      hideBetaBanks: true
    });
    /*
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "98a93bce-5978-43d5-ac00-bdea687c9f32",
      connectLinkId: "",
      companyName: "Lalalal",
      regionOfInstitutions: "Australia",
      hideBetaBanks: true
      })
      */
  }

  render() {
    return <div className="vc-inner-container">
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;