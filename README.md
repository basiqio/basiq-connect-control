The Basiq Connect Control is a UI component allows applicants to securely connect their bank accounts. It's written in React, however it exposes a vanilla JavaScript interface to ensure it can be used across all frameworks.

## Setup

Regardless of the JS framework you are using (eg Angular, VueJS), you will still need to install `react` and `react-dom`.

Install `basiq-connect-control` and it's dependencies:

```
$ npm install react  
$ npm install react-dom

$ npm install @basiq/basiq-connect-control
```
OPTIONAL:

If you are concerned about support for Internet Explorer, you may also install polyfill libraries along side such as `core-js` and `react-app-polyfill`.

## Usage

The package exports a single function, `BasiqConnect`, which takes a config object as a single input parameter. Calling this function will render the bank picker to the use

### Where to call `BasiqConnect()`

If you’re using vanilla JavaScript, you can call BasiqConnect anywhere after the host DOM element is loaded. 

If you are using React, you should call it either in `componentDidMount`, or, if you are using React Hooks, in `useEffect`.

```javascript
import BasiqConnect from "@basiq/basiq-connect-control"

export const BasiqConnectModal (() => {

  useEffect(() => {

          BasiqConnect(config)

      }, [])
      
      return <div id="basiq-control"></div>
})

```

### Configuration

The following parameters can be passed through the config object. Most are optional values however authentication params are required and can be provided by sending either:

- the `userId` and `token`, which can be obtained via the [BasiqAPI](https://api.basiq.io/reference) (see the quick start guide); or

- the connectLinkId, which is the link returned from `/users/{user.id}/auth_link`

```json
{
    containerId: String, // ID of the DOM element to which Basiq Connect Control will be rendered; 

    token: String, // CLIENT_ACCESS scope 
    userID: String, 
    // or
    connectLinkId: String, 

    // optional fields
    upload: Boolean, // should uploading statements be enabled
    connect: Boolean, // should connecting to bank with credentials be enabled
    companyName: String, // company name to be shown, will default to Basiq Dashboard name 
    regionOfInstitutions: String, // valid values: Australia, New Zealand
    hideTestBanks: Boolean, // should test banks (Basiq, Hooli) be hidden from user
    hideBetaBanks: Boolean // should beta banks be hidden from user
}
```

## Handling Jobs
You can listen and react to events emitted by the web app by using the addListener(event, cb) method. Multiple listeners per event are supported. The event you should listen for is `jobCreated`, which is triggered when a user links their financial institution using the UI, which kicks off an async job in the background.

This event will pass you the jobId which you can use to poll the `jobs/{jobId}` endpoint to check the status of each step. This allows you to:  

- Perform actions as soon as the step you rely on is complete without waiting for the following steps,

- Allow your user to carry on with their flow, keeping them engaged, and

- **Effectively manage any failed jobs, which is crucial to your application.** See the best practices for managing failed jobs


```javascript
const handleNewJob = async (event) => {
  let jobId = await event.detail.id;
  pollJob(jobId)
}

window.addEventListener("jobCreated", handleNewJob);
```

## Other events

The BasiqConnect package also provides a `basiqConnectMounted` event, which is triggered when the component has rendered. This allows for any handling of loading state to be managed in your UI. This can be done as below: 

```javascript
window.addEventListener("basiqConnectMounted", callback);
```