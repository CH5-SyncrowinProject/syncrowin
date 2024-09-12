import { put, call, takeLatest } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { userDetailService } from '../../services/apiService';
import { ProfileActions, ProfileTypes } from './reducer';

function* profileSaga(action) {
  try {
    const { userId } = action;

    const userData = yield call(userDetailService, userId);

    yield put(ProfileActions.getUserDetailsSuccess(userData));

  } catch (error) {
    yield put(ProfileActions.getUserDetailsFailure(error.message));

    NotificationManager.error('Failed to fetch user details', 'Error');
  }
}

export default function* profileRootWatcher() {
  yield takeLatest(ProfileTypes.GET_USER_DETAILS_REQUEST, profileSaga);
}
