import { createActions } from "reduxsauce";

export const { Types: PasswordResetTypes, Creators: PasswordResetActions } = createActions({
  sendOtpRequest: ['email'],
  sendOtpSuccess: ['response'],
  sendOtpFailure: ['error'],

  verifyOtpRequest: ['otp'],
  verifyOtpSuccess: ['response'],
  verifyOtpFailure: ['error'],

  resetPasswordRequest: ['newPassword', 'confirmPassword'],
  resetPasswordSuccess: ['response'],
  resetPasswordFailure: ['error']

});

const INITIAL_STATE = {
  processing: false,
  error: null,
  otpSendingResponse: null,
  verifyOtpResponse: null,
  resetPasswordResponse: null
};

export const passwordResetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Send OTP Request
    case PasswordResetTypes.SEND_OTP_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
        otpSendingResponse: null
      };
    case PasswordResetTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        processing: false,
        otpSendingResponse: action.response
      };
    case PasswordResetTypes.SEND_OTP_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.error
      };

    // Verify OTP Request
    case PasswordResetTypes.VERIFY_OTP_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
        verifyOtpResponse: null
      };
    case PasswordResetTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        processing: false,
        verifyOtpResponse: action.response
      };
    case PasswordResetTypes.VERIFY_OTP_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.error
      };

    // Reset Password Request
    case PasswordResetTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
        resetPasswordResponse: null
      };
    case PasswordResetTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        processing: false,
        resetPasswordResponse: action.response
      };
    case PasswordResetTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.error
      };

    default:
      return state;
  }
};
