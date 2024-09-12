import { put, call, takeLatest } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { editUserDetailService } from '../../services/apiService';
import { EditProfileActions, EditProfileTypes } from './reducer';

function* editProfileSaga(action) {
    const { userId, userData } = action;
    try {
        const response = yield call(editUserDetailService, userId, userData, action.userData);
        console.log("response", response);
        if (response.status === true) {
            yield put(EditProfileActions.updateProfileSuccess(response.data.data));
            NotificationManager.success('Details updated successfully', 'Success');
        } else {
            yield put(EditProfileActions.updateProfileFailure('Failed to update details'));
            NotificationManager.error('Failed to update user details', 'Error');
        }
    } catch (error) {
        yield put(EditProfileActions.updateProfileFailure(error.message));
        NotificationManager.error('An error occurred while updating user details', 'Error');
    }
}

export default function* EditProfileRootWatcher() {
    yield takeLatest(EditProfileTypes.UPDATE_PROFILE_REQUEST, editProfileSaga);
}

