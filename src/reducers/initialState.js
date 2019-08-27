export const ConnectMethod = {
  CONNECT: "CONNECT",
  UPLOAD: "UPLOAD",
  UNKNOWN: "UNKNOWN"
};

export const ConnectResult = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

export const StatementStatus = {
  ADDED: "ADDED",
  UNSUPPORTED: "UNSUPPORTED",
  UPLOADING: "UPLOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
}

export const initialState = {
  currentPage: null,
  partnerName: null,
  institutionList: [],
  smsCode: ["", "", "", ""],
  smsCodeValid: false,
  userId: "",
  accessToken: "",
  error: "",
  mobile: "",
  resendMessage: "",
  sendingSmsCode: false,
  connectSupported: true,
  uploadSupported: false,
  statements: [],
  institutions: [],
  connectMethod: ConnectMethod.UNKNOWN,
  selectedInstitution: null,
  connectResult: "",
  loginIdError: "",
  passwordError: "",
  securityCodeError: "",
  secondaryLoginIdError: "",
  loginId: "",
  secondaryLoginId: "",
  password: "",
  securityCode: "",
  statementsUploaded: false,
  authenticationRequired: true
};
