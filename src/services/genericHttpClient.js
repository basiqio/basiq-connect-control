/**
 * This small library represents convinient wrapper around Fetch API with small and compact interface.
 *
 * It contains 4 exported async functions: doGet, doPost, doPut and doDelete.
 * Each of them accepts almost similar arguments and always returns a promise of HttpResponse object.
 *
 * These functions do not throw, rather they indicate both exceptions and Http failures through
 * HttpResponse object, ie. these functions does not need to be wrapped in try-catch blocks
 * which makes their footprint in code small and elegant. Also, they return JSON-deserialized
 * payload if possible.
 *
 * HttpResponse is a compact generic response of Http request. It contains following fields:
 * ok      - Boolean value equal to ok attribute of Response object if any arrived.
 *           If Response did not arrive (exception happened) ok is false.
 * status  - Numeric status of Http Response object if any arrived.
 *           If Response did not arrive (exception happened) status is 0.
 * error   - If ok is true, error is null.
 *           Otherwise, it equals any error of Response object if any arrived.
 *           If Response did not arrive (exception happened) error contains exception details.
 * payload - If Response object arrived and contains body, payload equals body content.
 *           If Response object contains "Content-Type" header equal to 'application/json' or 'text/plain',
 *           then payload contians properly deserialized body. Otherwise it contains raw data.
 *           If Response did not arrive or does not contain body, payload is null.
 *
 * Exported functions accept following arguments:
 * url             - MANDATORY. Url to make request upon.
 * mappingFunction - OPTIONAL. Function which takes body response as an argument and returns an object
 *                   which becomes payload field of returned HttpResponse.
 * body            - OPTIONAL. Payload to be sent to server. Payload is automatically stringified unless is FormData.
 * headers         - OPTIONAL. Object with additional headers.
 */

export class HttpResponse {
  constructor() {
    this.ok = false;
    this.status = 0;
    this.error = null;
    this.payload = null;
  }
}

async function doHttp(url, method, mappingFunction, body, headers) {
  try {
    let requestConfig = { method };

    if (headers) {
      requestConfig = { ...requestConfig, headers };
    }

    if (body) {
      if (body instanceof FormData) {
        requestConfig = { ...requestConfig, body };
      } else {
        requestConfig = { ...requestConfig, body: JSON.stringify(body) };
      }
    }

    const fetchResponse = await fetch(url, requestConfig);

    const response = new HttpResponse();

    response.ok = fetchResponse.ok;
    response.status = fetchResponse.status;

    let deserializedFetchResponseBody = null;

    const contentType = fetchResponse.headers.get("Content-Type");

    if (contentType) {
      if (contentType.indexOf("application/json") !== -1) {
        const bodyText = await fetchResponse.text();
        if (bodyText.length !== 0) {
          deserializedFetchResponseBody = JSON.parse(bodyText);
        }
        deserializedFetchResponseBody = JSON.parse(bodyText);
      } else if (contentType.indexOf("text/plain") !== -1) {
        deserializedFetchResponseBody = await fetchResponse.text();
      } else {
        deserializedFetchResponseBody = await fetchResponse.blob();
      }
    }

    if (response.ok) {
      if (!mappingFunction || typeof mappingFunction !== "function") {
        mappingFunction = param => param;
      }

      response.payload = mappingFunction(deserializedFetchResponseBody);
    } else {
      response.errors = deserializedFetchResponseBody.data.map(error => ({
        code: error.code,
        title: error.title,
        detail: error.detail,
      }));
    }

    return response;
  } catch (ex) {
    const response = new HttpResponse();

    response.errors = [{
      code: ["internal-javascript-error"],
      title: ex.message,
      detail: null
    }];

    if (ex.fileName && ex.lineNumber) {
      response.errors[0].detail = `${ex.fileName}:${ex.lineNumber}`;
    }

    return response;
  }
}

export async function doGet(url, mappingFunction, headers) {
  return await doHttp(url, "GET", mappingFunction, null, headers);
}

export async function doPost(url, mappingFunction, body, headers) {
  return await doHttp(url, "POST", mappingFunction, body, headers);
}

export async function doPut(url, mappingFunction, body, headers) {
  return await doHttp(url, "PUT", mappingFunction, body, headers);
}

export async function doDelete(url, mappingFunction, body, headers) {
  return await doHttp(url, "DELETE", mappingFunction, body, headers);
}
