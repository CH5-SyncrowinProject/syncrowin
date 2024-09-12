import { all, fork } from 'redux-saga/effects';
import loginSaga from "../layouts/authentication/sign-in/saga";
import signUpSaga from "../layouts/authentication/sign-up/saga";
import passwordResetSaga from "layouts/authentication/forget-password/saga"
import profileSaga from "../layouts/profile/saga";
import editProfileSaga from "../layouts/EditProfile/saga";
import AddAssetSaga from "../layouts/library/Component/AddLibrary/saga";
import assetDetailSaga from "../layouts/library/saga"
import clientManagementSaga from 'layouts/ClientManagement/saga';
import addDataRootWatcher from 'layouts/Datasource/saga';

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(signUpSaga),
        fork(passwordResetSaga),
        fork(profileSaga),
        fork(editProfileSaga),
        fork(AddAssetSaga),
        fork(assetDetailSaga),
        fork(clientManagementSaga),
        fork(addDataRootWatcher)
    ]);
}
