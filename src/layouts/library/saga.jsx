import { put, call, takeLatest } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { assetDetailService, fetchAssetByIdService, editAssetService, childAssetDetailService, deleteAssetService, fetchEventsByAssetIdService, addEventService, editEventService, deleteEventService, fetchMaintenancesByAssetIdService, addmainService, EditmainService } from '../../services/apiService';
import { AssetDetailActions, AssetDetailTypes } from './reducer';

function* assetDetailSaga(action) {
    try {
        const response = yield call(assetDetailService, action.payload);
        if (response.status) {
            yield put(AssetDetailActions.assetDetailSuccess(response.data));
        } else {
            yield put(AssetDetailActions.assetDetailFailure('Failed to fetch asset details'));
        }
    } catch (error) {
        yield put(AssetDetailActions.assetDetailFailure(error.message));
        NotificationManager.error('Failed to fetch asset details');
    }
}

function* childAssetDetailSaga(action) {
    try {
        const response = yield call(childAssetDetailService, action.payload);
        if (response.status) {
            yield put(AssetDetailActions.childAssetDetailSuccess(response.data));
        } else {
            yield put(AssetDetailActions.childAssetDetailFailure('Failed to fetch child asset details'));
        }
    } catch (error) {
        yield put(AssetDetailActions.childAssetDetailFailure(error.message));
        NotificationManager.error('Failed to fetch child asset details');
    }
}

function* fetchAssetByIdSaga(action) {

    try {
        const response = yield call(fetchAssetByIdService, action.assetId);
        if (response.status) {
            yield put(AssetDetailActions.fetchAssetByIdSuccess(response.data));
        } else {
            yield put(AssetDetailActions.fetchAssetByIdFailure('Failed to fetch asset details'));
            NotificationManager.error('Failed to fetch asset details');
        }
    } catch (error) {
        yield put(AssetDetailActions.fetchAssetByIdFailure(error.message));
        NotificationManager.error('Failed to fetch asset details');
    }
}

// New saga for editing asset details
function* editAssetDetailSaga(action) {
    try {
        const response = yield call(editAssetService, action.assetId, action.newDetails);

        if (response.status) {
            yield put(AssetDetailActions.editAssetDetailSuccess(response.data));
            NotificationManager.success('Asset details updated successfully');
        } else {
            // Extract the error message from the API response
            const errorMessage = response.message || 'Failed to update asset details';
            yield put(AssetDetailActions.editAssetDetailFailure(errorMessage));
            NotificationManager.error(errorMessage);
        }
    } catch (error) {
        // Extract the error message from the caught error
        const errorMessage = error.response?.data?.message || 'Failed to update asset details';
        yield put(AssetDetailActions.editAssetDetailFailure(errorMessage));
        NotificationManager.error(errorMessage);
    }
}

// New saga for deleting an asset
function* deleteAssetSaga(action) {
    const { assetId, deleteAll } = action.payload;
    try {
        const response = yield call(deleteAssetService, { assetId, deleteAll });

        if (response.status) {
            const successMessage = response.message || 'Asset deleted successfully';
            yield put(AssetDetailActions.deleteAssetSuccess(assetId));
            NotificationManager.success(successMessage);

            // Refresh the asset list after successful deletion
            const payload = { createdBy: localStorage.getItem('userId') };
            yield put(AssetDetailActions.assetDetailRequest(payload));
        } else {
            const errorMessage = response.message || 'Failed to delete asset';
            yield put(AssetDetailActions.deleteAssetFailure(errorMessage));
            NotificationManager.error(errorMessage);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to delete asset';
        yield put(AssetDetailActions.deleteAssetFailure(errorMessage));
        NotificationManager.error(errorMessage);
    }
}

function* fetchEventsByAssetIdSaga(action) {
    try {
        const response = yield call(fetchEventsByAssetIdService, action.assetId);
        if (response.status) {
            yield put(AssetDetailActions.fetchEventsByAssetIdSuccess(response.data));
            // NotificationManager.success(response.message || 'Events fetched successfully');
        } else {
            yield put(AssetDetailActions.fetchEventsByAssetIdFailure('Failed to fetch events'));
            NotificationManager.error('Failed to fetch events');
        }
    } catch (error) {
        yield put(AssetDetailActions.fetchEventsByAssetIdFailure(error.message));
        NotificationManager.error('Failed to fetch events');
    }
}

function* detailEventSaga(action) {
    try {
        const response = yield call(fetchEventsByAssetIdService, action.assetId);
        if (response.status) {
            yield put(AssetDetailActions.detailEventSuccess(response.data));
        } else {
            yield put(AssetDetailActions.detailEventFailed('Failed to fetch events'));
            NotificationManager.error('Failed to fetch events');
        }
    } catch (error) {
        yield put(AssetDetailActions.detailEventFailed(error.message));
        NotificationManager.error('Failed to fetch events');
    }
}

function* editEventSaga(action) {
    try {
        console.log("Add Event Saga triggered", action.param);
        const response = yield call(addEventService, { ...action.param });
        console.log("API Response:", response);

        if (response.status) {
            yield put(AssetDetailActions.editEventSuccess(response));
            NotificationManager.success('Event added successfully!');

            //REFRESH
            yield put(AssetDetailActions.fetchEventsByAssetIdRequest(action.param.assetId));
        } else {
            yield put(AssetDetailActions.editEventFailed('Failed to add Event'));
            NotificationManager.error('Failed to add Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Event Saga:', error);
        yield put(AssetDetailActions.editEventFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Event Info. Please try again.');
    }
}

function* multiEventSaga(action) {
    try {
        console.log("MULTI Event Saga triggered", action.param);
        const response = yield call(editEventService, { ...action.param });
        console.log("API Response:", response);

        if (response.status) {
            yield put(AssetDetailActions.multiEventSuccess(response));
            NotificationManager.success('Event updated successfully!');

            //REFRESH
            yield put(AssetDetailActions.fetchEventsByAssetIdRequest(action.param.assetId));
        } else {
            yield put(AssetDetailActions.multiEventFailed('Failed to update Event'));
            NotificationManager.error('Failed to update Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Event Saga:', error);
        yield put(AssetDetailActions.multiEventFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to update Event Info. Please try again.');
    }
}

function* deleteEventSaga(action) {
    try {
        console.log("Delete Event Saga triggered", action.param);
        const response = yield call(deleteEventService, { ...action.param });
        console.log("API Response:", response);

        if (response.status) {
            const { data, status, statusText } = response;
            yield put(AssetDetailActions.deleteEventSuccess(data, status, statusText));
            NotificationManager.success('Event updated successfully!');

            //REFRESH
            yield put(AssetDetailActions.fetchEventsByAssetIdRequest(action.param.assetId));
        } else {
            yield put(AssetDetailActions.deleteEventFailed('Failed to update Event'));
            NotificationManager.error('Failed to update Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Event Saga:', error);
        yield put(AssetDetailActions.deleteEventFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to update Event Info. Please try again.');
    }
}

function* fetchMaintenancesByAssetIdSaga(action) {
    try {
        const response = yield call(fetchMaintenancesByAssetIdService, action.assetId);
        // console.log('API response:', response); // Check the structure

        if (response.status) {
            // Check if `response.data` is as expected
            //  console.log('Dispatching success action with:', response.data);
            yield put(AssetDetailActions.fetchMaintenancesByAssetIdSuccess(response.data));
        } else {
            yield put(AssetDetailActions.fetchMaintenancesByAssetIdFailure('Failed to fetch Maintenances'));
            NotificationManager.error('Failed to fetch Maintenances');
        }
    } catch (error) {
        console.error('API call error:', error);
        yield put(AssetDetailActions.fetchMaintenancesByAssetIdFailure(error.message));
        NotificationManager.error('Failed to fetch Maintenances');
    }
}

//add calender event
function* AddCalenderEventSaga(action) {
    console.log("aaaaaaaaaaaaaaaaaa")
    try {
        console.log("Add Calender Event Saga triggered", action.param);
        const response = yield call(addmainService, { ...action.param });
        console.log("API Response:", response);

        if (response.status) {
            yield put(AssetDetailActions.AddMaintenanceSuccess(response));
            NotificationManager.success('Calender Event added successfully!');

            //REFRESH
            yield put(AssetDetailActions.fetchMaintenancesByAssetIdRequest(action.param.assetId));
        } else {
            yield put(AssetDetailActions.AddMaintenanceFailed('Failed to add Calender Event'));
            NotificationManager.error('Failed to add Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Add Calender Event Saga:', error);
        yield put(AssetDetailActions.AddMaintenanceFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Calender Event Info. Please try again.');
    }
}

//Edit calender event
function* EditCalenderEventSaga(action) {
    console.log("aaaaaaaaaaaaaaaaaa")
    try {
        console.log("Edit Calender Event Saga triggered", action.param);
        const response = yield call(EditmainService, { ...action.param });
        console.log("API Response:", response);

        if (response.status) {
            yield put(AssetDetailActions.EditMaintenanceSuccess(response));
            NotificationManager.success('Calender Event Edited successfully!');

            //REFRESH
            yield put(AssetDetailActions.fetchMaintenancesByAssetIdRequest(action.param.assetId));
        } else {
            yield put(AssetDetailActions.EditMaintenanceFailed('Failed to Edit Calender Event'));
            NotificationManager.error('Failed to Edit Event. Please try again.');
        }
    } catch (error) {
        console.error('Error in Edit Calender Event Saga:', error);
        yield put(AssetDetailActions.EditMaintenanceFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to Edit Event Info. Please try again.');
    }
}

export default function* assetDetailRootWatcher() {
    yield takeLatest(AssetDetailTypes.ASSET_DETAIL_REQUEST, assetDetailSaga);
    yield takeLatest(AssetDetailTypes.CHILD_ASSET_DETAIL_REQUEST, childAssetDetailSaga);
    yield takeLatest(AssetDetailTypes.FETCH_ASSET_BY_ID_REQUEST, fetchAssetByIdSaga);
    yield takeLatest(AssetDetailTypes.EDIT_ASSET_DETAIL, editAssetDetailSaga);
    yield takeLatest(AssetDetailTypes.DELETE_ASSET_REQUEST, deleteAssetSaga);
    yield takeLatest(AssetDetailTypes.FETCH_EVENTS_BY_ASSET_ID_REQUEST, fetchEventsByAssetIdSaga);
    yield takeLatest(AssetDetailTypes.DETAIL_EVENT_REQUEST, detailEventSaga);
    yield takeLatest(AssetDetailTypes.EDIT_EVENT_REQUEST, editEventSaga);
    yield takeLatest(AssetDetailTypes.MULTI_EVENT_REQUEST, multiEventSaga);
    yield takeLatest(AssetDetailTypes.DELETE_EVENT_REQUEST, deleteEventSaga);
    yield takeLatest(AssetDetailTypes.FETCH_MAINTENANCES_BY_ASSET_ID_REQUEST, fetchMaintenancesByAssetIdSaga);
    yield takeLatest(AssetDetailTypes.ADD_MAINTENANCE_REQUEST, AddCalenderEventSaga);
    yield takeLatest(AssetDetailTypes.EDIT_MAINTENANCE_REQUEST, EditCalenderEventSaga);
}
