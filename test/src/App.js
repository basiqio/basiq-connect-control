import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      connectLink: "336dc8ab-c356-448c-b3cb-65f3d03a891e",
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