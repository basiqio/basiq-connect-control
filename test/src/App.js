import React from 'react';
import BasiqConnect from 'basiq-connect';
import './App.css';

class App extends React.Component {
	async componentDidMount() {
		BasiqConnect({
			containerId: 'basiq-connect-container',
			connectLinkId: 'b6e3c320-a66a-478f-a4a7-565c2209ac8a',
			regionOfInstitutions: 'Australia',
			hideBetaBanks: true
		});

		// BasiqConnect({
		// 	containerId: 'basiq-connect-container',
		// 	token:
		// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiIzZDRiODlkOC0wOWY1LTRiMGItODgxMC1hY2UwNzI5NWE4ODUiLCJhcHBsaWNhdGlvbmlkIjoiZDA0ODRjYWYtODM0NS00ZTk0LTk0ZmMtYzBiMzA4Y2E4Y2ZmIiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50IjpmYWxzZSwiY29ubmVjdF9zdGF0ZW1lbnRzIjp0cnVlLCJlbnJpY2giOiJwYWlkIiwiZW5yaWNoX2FwaV9rZXkiOiJib0gzRFRBbWU1N0kwYlNxZzZocHoxc3kzczFQcThYbDYxSkNENXc0IiwiZW5yaWNoX2VudGl0eSI6dHJ1ZSwiZW5yaWNoX2xvY2F0aW9uIjp0cnVlLCJlbnJpY2hfY2F0ZWdvcnkiOnRydWUsImFmZm9yZGFiaWxpdHkiOiJwYWlkIiwiaW5jb21lIjoicGFpZCIsImV4cGVuc2VzIjoicGFpZCIsImV4cCI6MTYyMjU2MTc3OCwiaWF0IjoxNjIyNTU4MTc4LCJ2ZXJzaW9uIjoiMi4wIiwiZGVuaWVkX3Blcm1pc3Npb25zIjpbXX0.mtPrNiGkPbtam526OjklKOn9ZGOWRsGcSOLoj0rCY_Y',
		// 	userID: 'b229efea-2cf9-4619-a415-afac6622d7b8',
		// 	connectLinkId: '',
		// 	companyName: 'Lalalal',
		// 	regionOfInstitutions: 'Australia',
		// 	hideBetaBanks: true
		// });
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
