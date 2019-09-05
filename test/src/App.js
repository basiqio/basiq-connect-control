import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLinkID: "f94efc61-3d98-4966-859c-dfd9d654bdad",
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