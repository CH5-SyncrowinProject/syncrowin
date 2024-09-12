import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { loginService } from '../../../services/apiService';
import { LoginActions, LoginTypes } from './reducer';
import history from '../../../services/navigation/index';

function* loginSaga(action) {
  console.log(action);
  try {
    const response = yield call(loginService, action.credentials);
    if (response.status === 200) {
      yield put(LoginActions.loginSuccess(response.data));
      NotificationManager.success(response.message || 'Login successful');
      // Example after successful login
      localStorage.setItem('designationId', response.data.designationId);

      // console.log("userId",response.data.userId);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('clientId', response.data.isClient);
      //localStorage.getItem('userId', response.data.userId);

      //  localStorage.setItem('refreshToken', response.data.refreshToken);
      //  localStorage.removeItem('token');
      //  localStorage.removeItem('refreshToken');
      //  history('/home');
      //window.location.reload()
      yield delay(1000);
      yield put(LoginActions.resetLoginResponse());
    } else {
      yield put(LoginActions.loginFailed({ errorMessage: response.message || 'Login failed' }));
      NotificationManager.error(response.message || 'Login failed');
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : 'Network error. Please try again.';
    yield put(LoginActions.loginFailed({ errorMessage }));
    NotificationManager.error(errorMessage);
  }
}

export default function* loginRootWatcher() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga);
}
