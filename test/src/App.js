import React from 'react';
import BasiqConnect from 'basiq-connect';
import './App.css';

class App extends React.Component {
	async componentDidMount() {
		BasiqConnect({
			containerId: 'basiq-connect-container',
			connectLinkId: '225b91d0-4aed-4377-8763-ac254a0a7368',
			regionOfInstitutions: 'Australia',
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
		return (
			<div className="vc-inner-container">
				<div id="basiq-connect-container"></div>
			</div>
		);
	}
}

export default App;
