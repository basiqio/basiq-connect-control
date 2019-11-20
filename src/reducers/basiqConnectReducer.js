import * as actionTypes from "../actions/actionTypes";

import pages from "../components/pages";
import { initialState, ConnectMethod, ConnectResult, StatementStatus } from "./initialState";

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.NAVIGATE_TO:
      newState.currentPage = action.value;
      if (newState.currentPage === pages.TermsOfServicePage) {
        newState.smsCode = ["", "", "", ""];
      }
      newState.loginIdError = "";
      newState.passwordError = "";
      newState.securityCodeError = "";
      newState.secondaryLoginIdError = "";
      newState.loginId = "";
      newState.password = "";
      newState.securityCode = "";
      newState.secondaryLoginId = "";
      newState.error = "";
      newState.statements = [];
      break;
    case actionTypes.AUTH_REQUEST_ID_VALIDATION_SUCCEDED:
      newState.currentPage = pages.TermsOfServicePage;
      newState.partnerName = action.value.partnerName;
      newState.connectSupported = action.value.connectSupported;
      newState.uploadSupported = action.value.uploadSupported;
      newState.mobile = action.value.mobile;
      newState.authenticationRequired = true;
      newState.authRequestId = action.value.authRequestId;
      newState.institutionRegion = action.value.institutionRegion;
      newState.hideTestBanks = action.value.hideTestBanks;
      newState.hideBetaBanks = action.value.hideBetaBanks;
      break;
    case actionTypes.AUTH_REQUEST_ID_VALIDATION_FAILED:
      newState.error = action.value;
      newState.currentPage = pages.InvalidUrlPage;
      break;
    case actionTypes.INSITUTION_CONNECTED:
      if (
        newState.institutionList.find(function(institution) {
          return institution.name === newState.selectedInstitution.shortName;
        }) == null
      ) {
        newState.institutionList = [
          ...state.institutionList,
          {
            name: action.value.name,
            icon: action.value.logo
          }
        ];
      }
      break;
    case actionTypes.SMS_CODE_CHANGED:
      const tmpArray = [...newState.smsCode];
      tmpArray[action.value.index] = action.value.value;
      newState.smsCode = tmpArray;
      newState.smsCodeValid = !newState.smsCode.includes("");
      break;
    case actionTypes.SMS_CODE_VALIDATION_SUCCEDED:
      newState.currentPage = pages.ConsentPage;
      newState.userId = action.value.userId;
      newState.accessToken = action.value.accessToken;
      newState.error = "";
      newState.resendMessage = "";
      newState.sendingSmsCode = false;
      break;
    case actionTypes.SMS_CODE_VALIDATION_FAILED:
      newState.error = action.value;
      newState.resendMessage = "";
      newState.sendingSmsCode = false;
      break;
    case actionTypes.SMS_CODE_SENT:
      newState.error = "";
      newState.resendMessage = action.value;
      break;
    case actionTypes.SMS_CODE_SUBMITED:
      if (newState.error === "Oops. The code doesn't appear to be valid. Please check and try again.") {
        newState.error = "";
      }
      newState.sendingSmsCode = true;
      break;
    case actionTypes.SMS_CODE_RESEND_STARTED:
      newState.smsCode = ["", "", "", ""];
      break;
    case actionTypes.FILE_UPLOAD_STARTED:
      let statement = {
        ...state.statements.find(({ id }) => id === action.value.fileId),
        status: StatementStatus.UPLOADING
      };
      let statements = state.statements.filter(({ id }) => id !== action.value.fileId);
      newState.statements = [...statements, statement];
      break;
    case actionTypes.FILE_ADDED:
      statement = {
        filename: action.value.filename,
        id: action.value.fileId,
        status: StatementStatus.ADDED,
        file: action.value.statement,
        institutionId: action.value.institutionId
      };
      newState.statements = [...newState.statements, statement];
      break;
    case actionTypes.FILE_UPLOAD_SUCCEDED:
      statement = {
        ...state.statements.find(({ id }) => id === action.value.fileId),
        status: StatementStatus.SUCCESS
      };
      statements = state.statements.filter(({ id }) => id !== action.value.fileId);
      newState.statements = [...statements, statement];
      newState.error = "";
      break;
    case actionTypes.FILE_UPLOAD_FAILED:
      newState.error = action.value.error;
      statement = {
        ...state.statements.find(({ id }) => id === action.value.fileId),
        status: StatementStatus.FAILURE
      };
      statements = state.statements.filter(({ id }) => id !== action.value.fileId);
      newState.statements = [...statements, statement];
      break;
    case actionTypes.INSTITUTIONS_FETCHED:
      newState.institutions = action.value;
      break;
    case actionTypes.INPUT_METHOD_SELECTED:
      newState.connectMethod = action.value.method;
      newState.currentPage = action.value.page;
      break;
    case actionTypes.INSTITUTION_SELECTED:
      newState.selectedInstitution = action.value;
      if (newState.connectMethod === ConnectMethod.UPLOAD) {
        newState.currentPage = pages.UploadStatementsPage;
      } else if (newState.connectMethod === ConnectMethod.CONNECT) {
        newState.currentPage = pages.ProvideCredentialsPage;
      }
      break;
    case actionTypes.UPLOAD_PAGE_FINISHED:
      if (
        newState.institutionList.find(function(institution) {
          return institution.name === newState.selectedInstitution.shortName;
        }) == null
      ) {
        newState.institutionList = [
          ...state.institutionList,
          {
            name: newState.selectedInstitution.shortName,
            icon: newState.selectedInstitution.logo.links.square
          }
        ];
      }
      newState.currentPage = pages.ConnectedInstitutionsPage;
      newState.connectMethod = ConnectMethod.UNKNOWN;
      newState.selectedInstitution = null;
      newState.statements = [];
      newState.error = "";
      break;
    case actionTypes.BANK_CONNECT_STARTED:
      newState.connectResult = ConnectResult.PENDING;
      newState.currentPage = pages.ConnectResultPage;
      newState.loginIdError = "";
      newState.passwordError = "";
      newState.securityCodeError = "";
      newState.secondaryLoginIdError = "";
      newState.error = "";
      break;
    case actionTypes.BANK_CONNECT_SUCCEDED:
      newState.connectResult = ConnectResult.SUCCESS;
      break;
    case actionTypes.BANK_CONNECT_FAILED:
      newState.connectResult = ConnectResult.FAILURE;
      break;
    case actionTypes.BANK_CONNECT_FINISHED:
      if (newState.connectResult === ConnectResult.SUCCESS) {
        if (
          newState.institutionList.find(function(institution) {
            return institution.name === newState.selectedInstitution.shortName;
          }) == null
        ) {
          newState.institutionList = [
            ...state.institutionList,
            {
              name: newState.selectedInstitution.shortName,
              icon: newState.selectedInstitution.logo.links.square
            }
          ];
        }
      }
      newState.connectResult = ConnectResult.PENDING;
      newState.currentPage = pages.ConnectedInstitutionsPage;
      newState.connectMethod = ConnectMethod.UNKNOWN;
      newState.selectedInstitution = null;
      break;
    case actionTypes.CONNECT_CREDENTIALS_VALIDATION_FAILED:
      newState.loginIdError = action.value["loginId"];
      newState.passwordError = action.value["password"];
      newState.securityCodeError = action.value["securityCode"];
      newState.secondaryLoginIdError = action.value["secondaryLoginId"];
      newState.error = "";
      break;
    case actionTypes.VERIFY_CREDENTIALS_FAILED:
      newState.currentPage = pages.ProvideCredentialsPage;
      newState.error =
        "Cannot login to target institution using supplied credentials. Please check credentials and try again.";
      break;
    case actionTypes.LOGIN_ID_CHANGED:
      newState.loginId = action.value;
      break;
    case actionTypes.SECONDARY_LOGIN_ID_CHANGED:
      newState.secondaryLoginId = action.value;
      break;
    case actionTypes.PASSWORD_CHANGED:
      newState.password = action.value;
      break;
    case actionTypes.SECURITY_CODE_CHANGED:
      newState.securityCode = action.value;
      break;
    case actionTypes.UNSUPPORTED_FILE_DROPPED:
      statement = {
        filename: action.value.filename,
        id: action.value.fileId,
        status: StatementStatus.UNSUPPORTED,
        errorMessage: "This filetype is not supported"
      };
      newState.statements = [...newState.statements, statement];
      break;
    case actionTypes.LARGE_FILE_DROPPED:
      statement = {
        filename: action.value.filename,
        id: action.value.fileId,
        status: StatementStatus.UNSUPPORTED,
        errorMessage: "Files bigger than 4.5MB are not supported"
      };
      newState.statements = [...newState.statements, statement];
      break;
    case actionTypes.FILE_REMOVED:
      newState.statements = state.statements.filter(({ id }) => id !== action.value);
      break;
    case actionTypes.TOKEN_VALIDATION_FAILED:
      newState.error = action.value;
      newState.currentPage = pages.InvalidUrlPage;
      break;
    case actionTypes.TOKEN_VALIDATION_SUCCEDED:
      newState.currentPage = pages.TermsOfServicePage;
      newState.connectSupported = action.value.connect;
      newState.uploadSupported = action.value.upload;
      newState.authenticationRequired = false;
      newState.userId = action.value.userId;
      newState.accessToken = action.value.token;
      newState.partnerName = action.value.partnerName;
      newState.institutionRegion = action.value.institutionRegion;
      newState.hideTestBanks = action.value.hideTestBanks;
      newState.hideBetaBanks = action.value.hideBetaBanks;
      break;
    case actionTypes.AUTHORIZATION_FAILED:
      newState.error = "Authorization failed";
      newState.currentPage = pages.InvalidUrlPage;
      break;
    default:
      break;
  }
  return newState;
};
