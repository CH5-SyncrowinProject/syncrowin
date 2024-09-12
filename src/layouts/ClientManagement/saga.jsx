import { all, takeLatest, call, put } from 'redux-saga/effects';
import { ClientManagementActions, ClientManagementTypes } from './reducer';
import { fetchUsersService, addClientService } from '../../services/apiService';
import { NotificationManager } from 'react-notifications';

function* fetchUsersSaga() {
  try {
    const response = yield call(fetchUsersService);
    yield put(ClientManagementActions.fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(ClientManagementActions.fetchUsersFailure(error.message));
  }
}

function* addClientSaga(action) {
  try {
    const response = yield call(addClientService, action.param);
    if (response.status === 200 && response.data.status) {
      yield put(ClientManagementActions.addClientSuccess(response.data));
      NotificationManager.success('Client Added successfully !', 'Success');

      // Trigger fetchUsersSaga to refresh the user list
      yield put(ClientManagementActions.fetchUsersRequest());
    } else {
      yield put(ClientManagementActions.addClientFailed(response.data));
      NotificationManager.error(response.data.message || 'Client add failed!', 'Error');
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Network error. Please try again.';
    yield put(ClientManagementActions.addClientFailed({ errorMessage }));
    NotificationManager.error(errorMessage);
  }
}

export default function* clientManagementSaga() {
  yield all([
    takeLatest(ClientManagementTypes.FETCH_USERS_REQUEST, fetchUsersSaga),
    takeLatest(ClientManagementTypes.ADD_CLIENT_REQUEST, addClientSaga),
  ]);
}
