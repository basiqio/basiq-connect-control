import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkId: "dc964264-4993-4ebf-b871-df038ec3711a",
      upload: true,
      connect: true,
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