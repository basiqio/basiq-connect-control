import * as actionTypes from "./actionTypes";
import * as apiService from "../services/basiqConnectHttpClient";
import pages from "../components/pages";
import { ConnectMethod, StatementStatus } from "../reducers/initialState";

const authRequestIdValidationSucceded = value => ({ type: actionTypes.AUTH_REQUEST_ID_VALIDATION_SUCCEDED, value });
const authRequestIdValidationFailed = ({ value }) => ({ type: actionTypes.AUTH_REQUEST_ID_VALIDATION_FAILED, value });
const smsCodeValidationSucceded = value => ({ type: actionTypes.SMS_CODE_VALIDATION_SUCCEDED, value });
const smsCodeValidationFailed = ({ value }) => ({ type: actionTypes.SMS_CODE_VALIDATION_FAILED, value });
const smsCodeSent = ({ value }) => ({ type: actionTypes.SMS_CODE_SENT, value });
const smsCodeSubmited = () => ({ type: actionTypes.SMS_CODE_SUBMITED });
const smsCodeResendStarted = () => ({ type: actionTypes.SMS_CODE_RESEND_STARTED });
const fileUploadStarted = value => ({ type: actionTypes.FILE_UPLOAD_STARTED, value });
const fileUploadFailed = value => ({ type: actionTypes.FILE_UPLOAD_FAILED, value });
const fileUploadSucceded = value => ({ type: actionTypes.FILE_UPLOAD_SUCCEDED, value });
const institutionsFetched = value => ({ type: actionTypes.INSTITUTIONS_FETCHED, value });
const institutionsFetchFailed = () => ({ type: actionTypes.INSTITUTIONS_FETCH_FAILED });
const bankConnectStarted = () => ({ type: actionTypes.BANK_CONNECT_STARTED });
const bankConnectFailed = () => ({ type: actionTypes.BANK_CONNECT_FAILED });
const bankConnectSucceded = () => ({ type: actionTypes.BANK_CONNECT_SUCCEDED });
const connectCredentialsValidationFailed = value => ({
  type: actionTypes.CONNECT_CREDENTIALS_VALIDATION_FAILED,
  value
});
const tokenValidationFailed =  ({value}) => ({ type: actionTypes.TOKEN_VALIDATION_FAILED, value });
const tokenValidationSucceded = value => ({ type: actionTypes.TOKEN_VALIDATION_SUCCEDED, value });

const validateInputs = ({ selectedInstitution, loginId, password }) => {
  const errors = {};
  
  if (!loginId) {
    errors["loginId"] = `You must provide ${selectedInstitution.loginIdCaption}`;
  }
  if (!password) {
    errors["password"] = `You must provide ${selectedInstitution.passwordCaption}`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

export const navigateToActionCreator = value => ({ type: actionTypes.NAVIGATE_TO, value });

export const smsCodeChangedActionCreator = value => ({ type: actionTypes.SMS_CODE_CHANGED, value });

export const uploadPageFinished = () => ({ type: actionTypes.UPLOAD_PAGE_FINISHED });

export const institutionSelected = value => ({ type: actionTypes.INSTITUTION_SELECTED, value });

export const bankConnectFinished = () => ({ type: actionTypes.BANK_CONNECT_FINISHED });

export const verifyCredentialsFailed = () => ({ type: actionTypes.VERIFY_CREDENTIALS_FAILED });

export const loginIdChanged = value => ({ type: actionTypes.LOGIN_ID_CHANGED, value });

export const secondaryLoginIdChanged = value => ({ type: actionTypes.SECONDARY_LOGIN_ID_CHANGED, value });

export const passwordChanged = value => ({ type: actionTypes.PASSWORD_CHANGED, value });

export const securityCodeChanged = value => ({ type: actionTypes.SECURITY_CODE_CHANGED, value });

export const unsupportedFileDropped = value => ({ type: actionTypes.UNSUPPORTED_FILE_DROPPED, value });

export const largeFileDropped = value => ({ type: actionTypes.LARGE_FILE_DROPPED, value });

export const fileRemoved = value => ({ type: actionTypes.FILE_REMOVED, value });

export const fileAdded = value => ({ type: actionTypes.FILE_ADDED, value });

export const authorizationFailed = () => ({type: actionTypes.AUTHORIZATION_FAILED});

export const authLinkDisableStarted = () => ({type: actionTypes.AUTH_LINK_DISABLE_STARTED});

export const authLinkDisableSuccess = () => ({type: actionTypes.AUTH_LINK_DISABLE_SUCCESS});

export const authLinkDisableFailed = () => ({type: actionTypes.AUTH_LINK_DISABLE_FAILED});

export const connectMethodSelected = method => ({
  type: actionTypes.INPUT_METHOD_SELECTED,
  value: { method, page: pages.SelectInstitutionPage }
});

export const connectToBank = (
  selectedInstitution,
  institutionId,
  loginId,
  password,
  securityCode,
  secondaryLoginId
) => async dispatch => {
  const { valid, errors } = validateInputs({ selectedInstitution, loginId, password });
  if (!valid) {
    dispatch(connectCredentialsValidationFailed(errors));
    return;
  }
  dispatch(bankConnectStarted());

  const response = await apiService.createConnection(institutionId, loginId, password, securityCode, secondaryLoginId);

  if (!response.ok) {
    dispatch(bankConnectFailed());
    return;
  }

  const abortController = apiService.addJobStatusChangedCallback(response.payload.id, status => {
    const verifyCredentialsStep = status.stepsStatus.find(stepStatus => stepStatus.title === "verify-credentials");
    if (verifyCredentialsStep && verifyCredentialsStep.status === "success") {
      abortController.abort();
      dispatch(bankConnectSucceded());
      return;
    }
    if (verifyCredentialsStep && verifyCredentialsStep.status === "failed") {
      abortController.abort();
      dispatch(verifyCredentialsFailed());
    }
    if (status.jobStatus === "failed" || status.jobStatus === "timeout") {
      dispatch(bankConnectFailed());
    }
  });
};

export const fetchInstitutions = (hideBetaBanks, institutionRegion) => async dispatch => {
  const institutions = await apiService.getInstitutions(hideBetaBanks, institutionRegion);

  if (!institutions.ok) {
    dispatch(institutionsFetchFailed());
    return;
  }

  dispatch(institutionsFetched(institutions.payload.data));
};

export const uploadStatements = ({ statements }) => dispatch => {
  statements.forEach(async statement => {
    if (statement.status === StatementStatus.ADDED) {
      dispatch(fileUploadStarted({ filename: statement.filename, fileId: statement.id }));
      const result = await apiService.uploadStatement(statement.institutionId, statement.file);
      if (!result.ok) {
        dispatch(fileUploadFailed({ error: `File ${statement.filename} could not be uploaded`, fileId: statement.id }));
        return;
      }
      dispatch(fileUploadSucceded({ fileId: statement.id }));
    }
  });
};

export const validateAuthRequestId = ({connectLink, connect, upload,
  partnerName, institutionRegion, hideTestBanks, hideBetaBanks}) => async dispatch => {

  if (!connectLink) {
    dispatch(authRequestIdValidationFailed({ value: "Invalid link" }));
  } else {
    const authRequestResponse = await apiService.verifyAuthRequestId(connectLink);

    if (authRequestResponse.ok) {

      let connectValue = connect !== undefined ? connect : authRequestResponse.payload.partner.connectSupported;
      let uploadValue = upload !== undefined ? upload : authRequestResponse.payload.partner.uploadSupported;
    
      if(!connectValue && !uploadValue){
        connectValue = true;
        uploadValue = false;
      }

      let partnerNameValue = "";

      if(partnerName) {
        partnerNameValue = partnerName;
      } else {
        partnerNameValue = authRequestResponse.payload.partner.name;
      }

      let institutionRegionValue = "Australia";

      if (institutionRegion) {
        institutionRegionValue = institutionRegion;
      } else if (authRequestResponse.payload.partner.institutionRegion) {
        institutionRegionValue = authRequestResponse.payload.partner.institutionRegion;
      }
      let hideTestBanksValue = hideTestBanks !== undefined ? hideTestBanks : authRequestResponse.payload.partner.hideTestBanks;
      let hideBetaBanksValue = hideBetaBanks !== undefined ? hideBetaBanks : authRequestResponse.payload.partner.hideBetaBanks;

      dispatch(
        authRequestIdValidationSucceded({
          partnerName: partnerNameValue,
          connectSupported: connectValue,
          uploadSupported: uploadValue,
          mobile: authRequestResponse.payload.mobile,
          authRequestId: connectLink,
          institutionRegion: institutionRegionValue,
          hideTestBanks: hideTestBanksValue,
          hideBetaBanks: hideBetaBanksValue,
          linkId: authRequestResponse.payload.link_id
        })
      );
      dispatch(fetchInstitutions(hideBetaBanks, institutionRegionValue))
      return;
    }
    dispatch(authRequestIdValidationFailed({ value: "Invalid link" }));
  }
};

export const validateToken = ({token, userId, connect, upload, partnerName, institutionRegion, hideTestBanks, hideBetaBanks}) => async dispatch => {
  const parsedJwt = parseJwt(token);
  const errorMessage = "Authorization failed";
  if (!parsedJwt) {
    return dispatch(tokenValidationFailed({ value: errorMessage }));
  }

  const userRequestResponse = await apiService.getUser(token, userId);
  if(userRequestResponse.ok) {
    apiService.setToken(userId, token);

    let connectValue = connect !== undefined ? connect : false;
    let uploadValue = upload !== undefined ? upload : false;

    if(!connectValue && !uploadValue){
      connectValue = true;
      uploadValue = false;
    }

    let institutionRegionValue = "Australia";
    if (institutionRegion) {
      institutionRegionValue = institutionRegion;
    }

    let hideTestBanksValue = hideTestBanks !== undefined ? hideTestBanks : false;
    let hideBetaBanksValue = hideBetaBanks !== undefined ? hideBetaBanks : false;

    
    dispatch(tokenValidationSucceded({
      token,
      userId,
      connect: connectValue,
      upload: uploadValue,
      partnerName,
      institutionRegion: institutionRegionValue,
      hideTestBanks: hideTestBanksValue,
      hideBetaBanks: hideBetaBanksValue
    }));
    dispatch(fetchInstitutions(hideBetaBanks, institutionRegionValue))
  } else {
    // eslint-disable-next-line no-console
    console.error("BASIC CONNECT CONTROL ERROR: Provided token and user id are not valid.");
    return dispatch(tokenValidationFailed({ value: errorMessage }));
  }
};

export const showBankConnect = ({userId, accessToken, connectSupported, uploadSupported}) => dispatch => {
  if (connectSupported && uploadSupported) {
    dispatch(navigateToActionCreator(pages.SelectMethodPage));
    return;
  }

  let connectMethod = ConnectMethod.UNKNOWN;

  if (connectSupported) {
    connectMethod = ConnectMethod.CONNECT;
  } else if (uploadSupported) {
    connectMethod = ConnectMethod.UPLOAD;
  }

  dispatch(connectMethodSelected(connectMethod));
};

export const requestSmsCodeVerification = (authRequestId) => async dispatch => {
  dispatch(navigateToActionCreator(pages.VerifyMobileNoPage));
  const errorMessage = `You have received 10 SMS codes and you reached a limit.\n
  Use latest SMS code or please contact your financial service partner and request a new link to be re-sent.`;
  const result = await apiService.invokeSmsVerificationCode(authRequestId);
  if (!result.ok) {
    dispatch(smsCodeValidationFailed({ value: errorMessage }));
  }
};

export const resendSmsCodeVerification = (authRequestId) => async dispatch => {
  dispatch(smsCodeResendStarted());
  const errorMessage = `You have received 10 SMS codes and you reached a limit.\n
  Use latest SMS code or please contact your financial service partner and request a new link to be re-sent.`;
  const result = await apiService.invokeSmsVerificationCode(authRequestId);
  if (!result.ok) {
    dispatch(smsCodeValidationFailed({ value: errorMessage }));
  } else {
    const resendMessage = "New SMS code has been sent.";
    dispatch(smsCodeSent({ value: resendMessage }));
  }
};

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const verifySmsCode = (authRequestId, smsCode) => async dispatch => {
  const errorMessage = "Oops. The code doesn't appear to be valid. Please check and try again.";
  dispatch(smsCodeSubmited());
  const result = await apiService.verifySmsCode(authRequestId, smsCode);

  if (result.ok && result.status === 200 && result.payload) {
    const parsedJwt = parseJwt(result.payload.access_token);

    if (!parsedJwt) {
      return dispatch(smsCodeValidationFailed({ value: errorMessage }));
    }

    dispatch(
      smsCodeValidationSucceded({
        userId: parsedJwt.userid,
        accessToken: result.payload.access_token
      })
    );
  } else if (result.status && result.status === 204) {
    dispatch(authRequestIdValidationFailed({ value: "Invalid SMS" }));
  } else {
    dispatch(smsCodeValidationFailed({ value: errorMessage }));
  }
};

export const disableAuthLink = (linkId) => async dispatch => {
  dispatch(navigateToActionCreator(pages.SuccessPage));
  dispatch(authLinkDisableStarted());
  const result = await apiService.disableAuthLink(linkId);
  if (result.ok) {
    dispatch(authLinkDisableSuccess());
  }
  else{
    dispatch(authLinkDisableFailed());
  }
}