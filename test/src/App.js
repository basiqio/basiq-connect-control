import React from 'react';
import BasiqConnect from 'basiq-connect';
import BasiqLogo from "./assets/images/basiq.png";
import "./App.css";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      partnerLogo: null,
      partnerFetched: false
      }
  }

  async componentDidMount(){
    BasiqConnect({containerId: "basiq-connect-container",
      token: "",
      userID: "",
      upload: true,
      connect: true,
      companyName: "Persida"
    })
    /*BasiqConnect({containerId: "basiq-connect-container", connectLink: window.location.pathname.substr(1), connect: true, companyName:"Blabla"});
    const response = await fetch(`https://au-api.basiq.io/client_auth/${window.location.pathname.substr(1)}`, {method: 'GET'});
    if(response.ok){
      const data = await response.json();
      this.setState({
        partnerLogo: data.partner.logoUrl,
        partnerFetched: true
      });
    }*/
  }

  render(){
    return(
      <div>
        <div className="vc-logo-row">
          {this.state.partnerLogo ? <img src={this.state.partnerLogo} alt="Partner logo" />: null}
        </div>
        <div id="basiq-connect-container"></div>
        {this.state.partnerFetched ?
          <div className="vc-basiq-logo-row">
            <div>Powered by</div>
            <a href="https://basiq.io/" target="_blank" rel="noopener noreferrer">
              <img src={BasiqLogo} alt="Basiq logo" />
            </a>
          </div> : null}
        </div>
        )
    }
}

export default App;