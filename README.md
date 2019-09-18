Basiq Connect Control is an UI control for web which allows applicants to securely connect to their banks so lenders can generate an affordability report. It is written in React but exposes interface in plain JavaScript.

## Requirements

1. Install `react` and `react-dom`; ensure that react and react-dom are at least v16.9.0. You need to install these libraries even if you do **not** develop your web application using React (for example if you build an Angular app). 

	```
	$ npm install react
	$ npm install react-dom
	```

2. Optionally, install (and import) polyfill libraries (in particualar if you want your app to be supported in Internet Explorer) for example, `core-js` and `react-app-polyfill`:

 	```
	$ npm install react-app-polyfill
	$ npm install core-js
	```
	
	and make proper imports on the top of your entry file, for example:
	
	```
	import "react-app-polyfill/ie11";
	import "core-js/stable";
	import "regenerator-runtime/runtime";
	```

	If you use Angular, have in mind that Angular app comes with `zone.js` polyfill; if you want to add any other polyfills you need to add 	them **before** `zone.js` is imported. For more information, view Angular documentation.
	
3. Install `basiq-connect-control`:

	```
	$ npm install @basiq/basiq-connect-control
	```
	
	and import it where you need it:
	
	```
	import BasiqConnect from "@basiq/basiq-connect-control"
	```
	
## Usage

Basiq Connect Control exports single function (which we call BasiqConnect) which receives configuration as an input parameter. Once application calls the function, Basiq Connect Control is rendered in DOM object whose id is provided in input configuration.

### Configuration

Configuration object contains following parameters (note that not all parameters are required):

* containerId
  - ID of the DOM element in which Basiq Connect Control will be rendered; optimal size of host element is 450px x 600px
  - Type: String
* token
  - Authentication token; it is obtaining through [BasiqAPI](https://api.basiq.io/reference)
  - Type: String
* userID
  - User ID of the applicant; it is obtaining through [BasiqAPI](https://api.basiq.io/reference)
  - Type: String
* connectLinkId
  - ID part of Basiq Connect link; it is obtained through [Basiq Dashboard](https://dashboard.basiq.io/)
  - Type: String
  - Example: If connect link is https://connect.basiq.io/0272b5c7-b19a-4d93-908d-18c44ferffwd7a - ID part of connect link is 0272b5c7-b19a-4d93-908d-18c44ferffwd7a
* upload
  - True if uploading statements should be enabled
  - Type: Boolean
* connect
  - True if connecting to bank with credentials should be enabled
  - Type: Boolean 
* companyName
  - Name of the company (bank) to be shown in the control; if not provided companyName defaults to name configured on [Basiq Dashboard](https://dashboard.basiq.io/)
  - Type: String
* regionOfInstitutions
  - Only institutions from this region will be shown. Valid values: Australia, New Zealand.
  - Type: String

### Authentication

Basiq Connect Control requires authentication. Authentication is done by providing either (1) connect link, or (2) both access token and user id of applicant. Connect link can be obtained from [Basiq Dashboard](https://dashboard.basiq.io/); authentication token and user id can be obtained from [BasiqAPI](https://api.basiq.io/reference).

### Where to call `BasiqConnect`?

If your application is vanilla JavaScript, you can call `BasiqConnect` anywhere after host DOM element is loaded. If you use React to build you application, good place for calling `BasiqConnect` is in `componentDidMount` function; if you use Angular, good place would be in `ngOnInit` function.

### Examples

- Calling Basiq Connect with provided token and userID:

	```
	import BasiqConnect from "@basiq/basiq-connect-control";
	
	BasiqConnect({
	    containerId: DOM_CONTAINER_ID,
	    token: YOUR_TOKEN,
	    userID: YOUR_USER_ID,
	    upload: TRUE/FALSE,
	    connect: TRUE/FALSE,
	    companyName: YOUR_COMPANY_NAME,
            regionOfInstitutions: YOUR_REGION
	});
	```

- Calling Basiq Connect with provided connect link:

	```
	import BasiqConnect from "@basiq/basiq-connect-control";
	
	BasiqConnect({
	    containerId: DOM_CONTAINER_ID,
	    connectLinkId: YOUR_CONNECT_LINK,
	    upload: TRUE/FALSE,
	    connect: TRUE/FALSE,
	    companyName: YOUR_COMPANY_NAME,
            regionOfInstitutions: YOUR_REGION
	});
	```
