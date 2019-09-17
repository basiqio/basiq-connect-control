import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "95fc4c86-3738-4f15-af97-a3a19ee957f9",
      upload: true,
      connect: true,
      regionOfInstitutions: "Australia",
      companyName: "Persida"
    });
  }

  render() {
    return <div>
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;