import React from 'react';
import BasiqConnect from 'basiq-connect';
import "./App.css";

class App extends React.Component {
  async componentDidMount(){
    
    /*BasiqConnect({containerId: "basiq-connect-container",
      connectLinkId: "0c1e72d9-a6ac-43bb-82cb-6952926c1ef7",
      hideBetaBanks: true,
      regionOfInstitutions: "Australia"
    });*/
    
    BasiqConnect({containerId: "basiq-connect-container",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiJiMWZiNDk1ZC0zZmEzLTRhNmQtYjRkYi0xOTYzYmY1OWRmY2IiLCJhcHBsaWNhdGlvbmlkIjoiNjk2YzI4MDItMGVhMS00ODk3LThmOTUtYTY2ZmY5NDQ5YjQ4Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiYWZmb3JkYWJpbGl0eSI6InBhaWQiLCJpbmNvbWUiOiJwYWlkIiwiZXhwZW5zZXMiOiJwYWlkIiwiZXhwIjoxNTczNzM3OTIzLCJpYXQiOjE1NzM3MzQzMjMsInZlcnNpb24iOiIyLjAifQ.1XGE2gYQLp2xobZnTbSIBPM_3tMSW4DZ9mc8S-tWA0k",
      userID: "9fc98249-ba11-43a1-8307-1ef27aeca784",
      connectLinkId: "",
      companyName: "Lalalal",
      regionOfInstitutions: "Australia",
      hideBetaBanks: true
      })
  }

  render() {
    return <div className="vc-inner-container">
      <div id="basiq-connect-container"></div>
    </div>;
  }
}

export default App;