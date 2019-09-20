import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "9cd94cc9-daf3-4c7e-866a-1d016a168f3b",
      upload: true,
      connect: true,
      companyName: "Persida"
    });
  }

  render() {
    return <div id="basiq-connect-container"></div>;
  }
}

export default App;