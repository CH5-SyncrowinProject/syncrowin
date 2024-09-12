import { put, call, takeLatest } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { signUpService } from '../../../services/apiService';
import { SignupActions, SignupTypes } from './reducer';
import history from '../../../services/navigation/index';

function* signupSaga(action) {
    try {
        const response = yield call(signUpService, action.param); 
        if (response.status === 200) {
        yield put(SignupActions.signupSuccess(response.data));
    

        NotificationManager.success('Signup successful!', 'Success');
       
      }
     else{
        yield put(SignupActions.signupFailed(error));
        NotificationManager.error('Signup failed!', 'Error');
    }
}
    catch (error) {
        console.log(error,"error");
        const errorMessage = error.response
          ? error.response.data.message
          : 'Network error. Please try again.';
        yield put(SignupActions.signupFailed({ errorMessage }));
        NotificationManager.error(errorMessage);
      }
}

export default function* signUpRootWatcher() {
    yield takeLatest(SignupTypes.SIGNUP_REQUEST, signupSaga);
}
