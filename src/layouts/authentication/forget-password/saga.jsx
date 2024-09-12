
import { takeLatest, call, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { passwordResetService } from '../../../services/apiService';
import { PasswordResetTypes, PasswordResetActions } from './reducer';

// Send OTP Request Saga
function* sendOtpRequestSaga(action) {
 // console.log("sendOtpRequestSaga action:", action);
  try {
    console.log("Calling passwordResetService with email:", action.email);
    const response = yield call(passwordResetService,  action.email );
   // console.log("Response from passwordResetService:", response);

    if (response.status) {
      yield put(PasswordResetActions.sendOtpSuccess(response));
      NotificationManager.success(response.message);
    } else {
      yield put(PasswordResetActions.sendOtpFailure(response.message));
      NotificationManager.error('Email not found');
    }
  } catch (error) {
    console.log("Error in sendOtpRequestSaga:", error);
    yield put(PasswordResetActions.sendOtpFailure(error.message));
    NotificationManager.error(error.message);
  }
}

// Verify OTP Request Saga
function* verifyOtpRequestSaga(action) {
 // console.log("verifyOtpRequestSaga action:", action);
  try {
    console.log("Calling passwordResetService with otp:", action.otp);
    const response = yield call(passwordResetService,  action.otp );
  //  console.log("Response from passwordResetService:", response);

    if (response.status) {
      yield put(PasswordResetActions.verifyOtpSuccess(response));
      NotificationManager.success(response.message);
    } else {
      yield put(PasswordResetActions.verifyOtpFailure(response.message));
      NotificationManager.error(response.message);
    }
  } catch (error) {
    console.log("Error in verifyOtpRequestSaga:", error);
    yield put(PasswordResetActions.verifyOtpFailure(error.message));
    NotificationManager.error(error.message);
  }
}

// Reset Password Request Saga
function* resetPasswordRequestSaga(action) {
 // console.log("resetPasswordRequestSaga action:", action);
  try {
   
    const response = yield call(passwordResetService,  action.newPassword, action.confirmPassword );
    console.log("Response from passwordResetService:", response);

    if (response.status) {
      yield put(PasswordResetActions.resetPasswordSuccess(response));
      NotificationManager.success(response.message);
    } else {
      yield put(PasswordResetActions.resetPasswordFailure(response.message));
      NotificationManager.error(response.message);
    }
  } catch (error) {
    console.log("Error in resetPasswordRequestSaga:", error);
    yield put(PasswordResetActions.resetPasswordFailure(error.message));
    NotificationManager.error(error.message);
  }
}

export default function* passwordResetRootWatcher() {
  yield takeLatest(PasswordResetTypes.SEND_OTP_REQUEST, sendOtpRequestSaga);
  yield takeLatest(PasswordResetTypes.VERIFY_OTP_REQUEST, verifyOtpRequestSaga);
  yield takeLatest(PasswordResetTypes.RESET_PASSWORD_REQUEST, resetPasswordRequestSaga);
}
