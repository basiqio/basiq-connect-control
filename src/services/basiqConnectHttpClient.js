/**
 * This module is aimed to be central place in basiq-connect for
 * communication with backend. It contians list of functions which wrap http
 * requests and offers clear vocabulary for communication with backend.
 *
 * Also it persists session details (eg. token, userId), so user of the module does not need
 * to take care of it. Be aware that session details are lost once we navigate away from the
 * page or refresh the page. We expect authentication to happen every time user opens basiq-connect.
 *
 * All http communication in basiq-connect should be contianed in this module.
 */

import { doGet, doPost, doPut } from "./genericHttpClient";

const API_URL = "https://au-api.basiq.io";
const DASHBOARD_API_URL = "https://p4c8zn20r9.execute-api.ap-southeast-2.amazonaws.com/Production_v1/";
// const API_URL = "https://27ghl0gdic.execute-api.ap-southeast-2.amazonaws.com/Development/";
// const DASHBOARD_API_URL = "https://c9joivz12f.execute-api.ap-southeast-2.amazonaws.com/Development/";

let userToken = "";
let authorizationHeader = {
  Authorization: `Bearer ${userToken}`
};
let userId = "";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function setToken(id, token) {
  userToken = token;
  authorizationHeader = {
    Authorization: `Bearer ${userToken}`
  };
  userId = id;
}

export async function verifyAuthRequestId(authRequestId) {

  return await doGet(`${DASHBOARD_API_URL}client_auth/${authRequestId}`);
}

export async function disableAuthLink(authRequestId) {
  const headers = {
    "Content-Type": "application/json",
    ...authorizationHeader
  };
  return await doPut(`${DASHBOARD_API_URL}client_auth/${authRequestId}`, null, null, headers);
}

export async function invokeSmsVerificationCode(authRequestId) {
  return await doPost(`${DASHBOARD_API_URL}client_auth/${authRequestId}`);
}

export async function verifySmsCode(authRequestId, smsCode) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic SMS_CODE:${authRequestId}`
  };

  const body = {
    "sms-code": smsCode
  };

  const response = await doPost(`${DASHBOARD_API_URL}client_auth/${authRequestId}/token`, null, body, headers);

  if (response.ok && response.status === 200 && response.payload) {
    userToken = response.payload.access_token;

    authorizationHeader = {
      Authorization: `Bearer ${userToken}`
    };

    const parsedToken = parseJwt(response.payload.access_token);
    userId = parsedToken.userid;
  }

  return response;
}

export async function getUser(token, id) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };
  return await doGet(`${API_URL}/users/${id}`, null, headers);
}

export async function getInstitutions(hideBetaBanks, institutionRegion) {
  if (hideBetaBanks && institutionRegion) {
    return await doGet(`${API_URL}/public/institutions?filter=institution.authorization.eq('user'),institution.connectorStatus.eq('active'),institution.country.eq('${institutionRegion}')`);
  } else if (institutionRegion) {
    return await doGet(`${API_URL}/public/institutions?filter=institution.authorization.eq('user'),institution.country.eq('${institutionRegion}')`);
  } else if (hideBetaBanks) {
    return await doGet(`${API_URL}/public/institutions?filter=institution.authorization.eq('user'),institution.connectorStatus.eq('active')`);
  }
  return await doGet(`${API_URL}/public/institutions?filter=institution.authorization.eq('user')`);
}

export async function createConnection(institutionId, loginId, password, securityCode, secondaryLoginId) {
  const payload = {
    loginId,
    password,
    institution: {
      id: institutionId
    }
  };

  if (securityCode) {
    payload["securityCode"] = securityCode;
  }
  if (secondaryLoginId) {
    payload["secondaryLoginId"] = secondaryLoginId;
  }

  const headers = {
    "Content-Type": "application/json",
    ...authorizationHeader
  };

  return await doPost(`${API_URL}/users/${userId}/connections`, null, payload, headers);
}

export async function checkJobStatus(jobId) {
  return await doGet(`${API_URL}/jobs/${jobId}`, null, authorizationHeader);
}

export async function uploadStatement(institutionId, statementContent) {
  const headers = {
    ...authorizationHeader
  };

  const body = new FormData();
  body.append("institutionId", institutionId);
  body.append("statement", statementContent);

  return await doPost(`${API_URL}/users/${userId}/statements`, null, body, headers);
}

export class JobStatusChangedAbortController {
  constructor(intervalId) {
    this.intervalId = intervalId;
  }

  abort() {
    clearInterval(this.intervalId);
  }
}

/**
 * Function takes @param connectionJobId, queries job status every second, and
 * calls @param jobStatusChangedCallback every time job/steps status is changed.
 * Job quering timeouts after 1 hour.
 *
 * @param jobStatusChangedCallback is called with following object as an argument:
 * ```{
 *  jobStatus: (possible values: "success", "failed", "in-progress", "timeout")
 *  stepsStatus: [
 *    {
 *      title: "",
 *      status: "" (possible values: "success", "failed", "in-progress", "pending")
 *    }, ...
 *  ]
 * }```
 *
 * jobStatus is being calculated in following manner:
 * If all steps have status 'success', jobStatus is 'success'.
 * If any of steps have status 'failed', 'jobStatus' is 'failed'.
 * Otherwise, if any of steps have status 'in-progress' or 'pending', job status is 'in-progress'.
 * If timeout happens, jobStatus is 'timeout'.
 */
export function addJobStatusChangedCallback(connectionJobId, jobStatusChangedCallback) {
  function areStepsEqual(status1, status2) {
    if (status1.length !== status2.length) {
      return false;
    }
    for (let i = 0; i <= status1.length - 1; i++) {
      if (status1[i].title !== status2[i].title || status1[i].status !== status2[i].status) {
        return false;
      }
    }

    return true;
  }

  function calculateJobStatus(stepsStatus) {
    for (let i = 0; i <= stepsStatus.length - 1; i++) {
      if (stepsStatus[i].status === "in-progress" || stepsStatus[i].status === "pending") {
        return "in-progress";
      }
    }

    for (let i = 0; i <= stepsStatus.length - 1; i++) {
      if (stepsStatus[i].status === "failed") {
        return "failed";
      }
    }

    return "success";
  }

  const FETCH_INTERVAL = 1000;
  const TIMEOUT_INTERVAL = 60 * 60 * 1000;
  const FETCH_NUM_TIMEOUT = TIMEOUT_INTERVAL / FETCH_INTERVAL;

  let stepsStatus = [];
  let intervalId = 0;
  let fetchNum = 0;

  intervalId = setInterval(async () => {
    const response = await checkJobStatus(connectionJobId);

    if (!response.ok) {
      return;
    }

    const newCurrentStatus = response.payload.steps.map(step => ({
      title: step.title,
      status: step.status
    }));

    if (!areStepsEqual(stepsStatus, newCurrentStatus)) {
      stepsStatus = newCurrentStatus;
      const jobStatus = calculateJobStatus(stepsStatus);

      if (intervalId !== 0) {
        jobStatusChangedCallback({ jobStatus, stepsStatus });
      }

      if (jobStatus === "success" || jobStatus === "failure") {
        clearInterval(intervalId);
        intervalId = 0;
      }
    }

    if (fetchNum >= FETCH_NUM_TIMEOUT) {
      if (intervalId !== 0) {
        jobStatusChangedCallback({ jobStatus: "timeout", stepsStatus });
      }

      clearInterval(intervalId);
      intervalId = 0;
    }
    fetchNum++;
  }, FETCH_INTERVAL);

  return new JobStatusChangedAbortController(intervalId);
}
