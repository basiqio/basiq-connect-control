Basiq Connect is a javascript library written in React, which allows applicants to securely connect to their bank so lenders can generate an Affordability Report.

## Instalation

$ npm install basiq-connect

Basiq Connect is a function which receives input object with following parameters:

1. containerId
  - ID of DOM element in which basiq connect will be rendered
  Type: String
2. token 
  - authentication token
  Type: String
3. userID
  - ID of the user
  Type: String
4. connectLink
  - Basiq Connect link
  Type: String
5. upload
  - True if uploading statements should be enabled
  Type: Boolean 
6. connect
  - True if connecting to bank with credentials should be enabled
  Type: Boolean 
7. companyName
  - Name of the company(bank)
  Type: String

## Example Usage

- First you have to Install react and react-dom:
    $ npm install react
    $ npm install react-dom

Then you can call Basiq Connect with two possible ways to authenticate: You can provide connect link or you can provide access provide token and user id.

- Calling Basiq Connect with provided token and userID
  Add the following code to your .js file:

```
import BasiqConnect from 'basiq-connect';

BasiqConnect({
    containerId: DOM_CONTAINER_ID,
    token: YOU_TOKEN,
    userID: YOUR_USER_ID,
    upload: TRUE/FALSE,
    connect: TRUE\FALSE,
    companyName: YOUR_COMPANY_NAME
});
```

- Calling Basiq Connect with provided connect link:
Add the following code to your .js file:

```
import BasiqConnect from 'basiq-connect';

BasiqConnect({
    containerId: DOM_CONTAINER_ID,
    connectLink: YOUR_CONNECT_LINK,
    upload: TRUE/FALSE,
    connect: TRUE\FALSE,
    companyName: YOUR_COMPANY_NAME
});

```

### 

