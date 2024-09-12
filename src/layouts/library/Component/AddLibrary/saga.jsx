import { put, call, takeLatest, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { addAssetService, addOperationalInfoService, addSupportContactService, addEventService, addmainService } from '../../../../services/apiService';
import { AddAssetActions, AddAssetTypes, AddOperationalInfoActions, AddOperationalInfoTypes, AddSupportContactTypes, AddSupportContactActions, addEventActions, AddEventTypes, addMaintenanceActions, AddMaintenanceTypes } from './reducer';

function* addAssetSaga(action) {
    try {
        const response = yield call(addAssetService, action.param);

        if (response.status) {
            const assetId = response.data.assetId;

            // Store assetId in Redux state
            yield put(AddAssetActions.setAssetId(assetId));

            yield put(AddAssetActions.addAssetSuccess(response));
            NotificationManager.success('Asset added successfully!');
        } else {
            const errorMessage = response.message || 'Failed to add asset';
            yield put(AddAssetActions.addAssetFailed(errorMessage));
            NotificationManager.error(errorMessage);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to add asset. Please try again.';
        yield put(AddAssetActions.addAssetFailed(errorMessage));
        NotificationManager.error(errorMessage);
    }
}

function* addOperationalInfoSaga(action) {
    try {
        const assetId = yield select(state => state.addAsset.assetId); // Get assetId from Redux state
        const response = yield call(addOperationalInfoService, { ...action.param, assetId });

        if (response.status) {
            yield put(AddOperationalInfoActions.addOperationalInfoSuccess(response));
            NotificationManager.success('Operational Info added successfully!');
        } else {
            yield put(AddOperationalInfoActions.addOperationalInfoFailed('Failed to add OperationalInfo'));
            NotificationManager.error('Failed to add OperationalInfo. Please try again.');
        }
    } catch (error) {
        yield put(AddOperationalInfoActions.addOperationalInfoFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add OperationalInfo. Please try again.');
    }
}

function* addSupportContactSaga(action) {
    try {
        // console.log('Add Support Contact Saga initiated', action.param);
        const assetId = yield select(state => state.addAsset.assetId);
        const response = yield call(addSupportContactService, { ...action.param, assetId });
        // console.log('API Response:', response);

        if (response.status) {
            yield put(AddSupportContactActions.addSupportContactSuccess(response));
            NotificationManager.success('Support contact info added successfully!');
        } else {
            yield put(AddSupportContactActions.addSupportContactFailed('Failed to add Support contact'));
            NotificationManager.error('Failed to add Support contact. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Support Contact Saga:', error);
        yield put(AddSupportContactActions.addSupportContactFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Support contact info. Please try again.');
    }
}

function* addEventSaga(action) {
    try {
        // console.log("Add Event Saga triggered", action.param);
        const assetId = yield select(state => state.addAsset.assetId);
        // console.log("Asset ID fetched from state:", assetId);
        const response = yield call(addEventService, { ...action.param, assetId });
        // console.log("API Response:", response);

        if (response.status) {
            yield put(addEventActions.addEventSuccess(response));
            NotificationManager.success('Event added successfully!');
        } else {
            yield put(addEventActions.addEventFailed('Failed to add Event'));
            NotificationManager.error('Failed to add Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Event Saga:', error);
        yield put(addEventActions.addEventFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Event Info. Please try again.');
    }
}

function* addMaintenanceSaga(action) {
    try {
        console.log("Add Maintenance Saga triggered", action.param);

        const assetId = yield select(state => state.addAsset.assetId);
        console.log("Asset ID fetched from state:", assetId);

        // Proceed only if assetId is not null or undefined
        if (assetId) {
            const response = yield call(addmainService, { ...action.param, assetId });
            console.log("API Response:", response);

            if (response.status) {
                yield put(addMaintenanceActions.addCalenderSuccess(response));
                NotificationManager.success('Maintenance added successfully!');
            } else {
                yield put(addMaintenanceActions.addMaintenanceFailed('Failed to add Maintenance'));
                NotificationManager.error('Failed to add Maintenance. Please try again.');
            }
        } else {
            console.log("Asset ID is null or undefined, skipping API call.");
            // Optionally, you can dispatch a failure action or show a notification here
            yield put(addMaintenanceActions.addCalenderFailed('Asset ID is missing.'));
            NotificationManager.error('Asset ID is missing. Cannot add Maintenance.');
        }
    } catch (error) {
        console.error('Error in Add Maintenance Saga:', error);
        yield put(addMaintenanceActions.addCalenderFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Maintenance Info. Please try again.');
    }
}

export default function* AddAssetRootWatcher() {
    yield takeLatest(AddAssetTypes.ADD_ASSET_REQUEST, addAssetSaga);
    yield takeLatest(AddOperationalInfoTypes.ADD_OPERATIONAL_INFO_REQUEST, addOperationalInfoSaga);
    yield takeLatest(AddSupportContactTypes.ADD_SUPPORT_CONTACT_REQUEST, addSupportContactSaga);
    yield takeLatest(AddEventTypes.ADD_EVENT_REQUEST, addEventSaga);
    yield takeLatest(AddMaintenanceTypes.ADD_CALENDER_REQUEST, addMaintenanceSaga);
}
