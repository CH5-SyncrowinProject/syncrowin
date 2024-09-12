import { put, call, takeLatest, select } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import { datasourceService, listdataService, editOPCService, deleteOPCService, getvariableService, addVariableService } from "services/apiService";
import { AddDataAction, AddDataType } from "./reducer";

//Add
function* addDataSaga(action) {
    try {
        console.log("Add Event Saga triggered", action.param.clientId);
        const response = yield call(datasourceService, { ...action.param });
        if (response.status) {
            yield put(AddDataAction.addDataSuccess(response));
            NotificationManager.success('Data Source Added Succesfully!');

            //REFRESH
            const payload = { clientId: action.param.clientId }
            yield put(AddDataAction.listDataRequest(payload));
        } else {
            yield put(AddDataAction.addDataFailed('Failed to add Data Source'));
            NotificationManager.error('Failed to add Data Source. Please try again.');
        }
    } catch (error) {
        yield put(AddDataAction.addDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add Data Source. Please try again.');
    }
}

//List
function* listDataSaga(action) {
    try {
        const response = yield call(listdataService, { ...action.payload });
        if (response.status) {
            // Passing dashboards array correctly to the reducer
            yield put(AddDataAction.listDataSuccess(response.data));
        } else {
            yield put(AddDataAction.listDataFailed(response.message || 'Failed to fetch data'));
            NotificationManager.error(response.message || 'Failed to fetch data. Please try again.');
        }
    } catch (error) {
        console.error('Saga error:', error);
        yield put(AddDataAction.listDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to fetch data. Please try again.');
    }
}

//Variable
function* variableDataSaga(action) {
    try {
        const response = yield call(getvariableService, { ...action.payload });
        console.log("variable", response);
        if (response.status) {
            yield put(AddDataAction.variableDataSuccess(response.data));
        } else {
            yield put(AddDataAction.variableDataFailed(response.message || 'Failed to fetch data'));
            NotificationManager.error(response.message || 'Failed to fetch data. Please try again.');
        }
    } catch (error) {
        console.error('Saga error:', error);
        yield put(AddDataAction.variableDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to fetch data. Please try again.');
    }
}

function* addVariableDataSaga(action) {
    try {
        const response = yield call(addVariableService, { ...action.payload });
        if (response.status) {
            yield put(AddDataAction.addVariableDataSuccess());
            NotificationManager.success('Variables added successfully.');
        } else {
            yield put(AddDataAction.addVariableDataFailed(response.message || 'Failed to add variables'));
            NotificationManager.error(response.message || 'Failed to add variables. Please try again.');
        }
    } catch (error) {
        console.error('Saga error:', error);
        yield put(AddDataAction.addVariableDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to add variables. Please try again.');
    }
}

// Delete OPC Server
function* deleteDataSaga(action) {
    try {
        const response = yield call(deleteOPCService, { ...action.param });
        if (response.status) {
            yield put(AddDataAction.deleteDataSuccess(response));
            NotificationManager.success('Server Info deleted successfully!');

            //REFRESH
            const payload = { clientId: action.param.clientId }
            yield put(AddDataAction.listDataRequest(payload));
        } else {
            yield put(AddDataAction.deleteDataFailed('Failed to delete Server Info'));
            NotificationManager.error('Failed to delete Server Info. Please try again.');
        }
    } catch (error) {
        yield put(AddDataAction.deleteDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to delete Server Info. Please try again.');
    }
}

//edit
function* editDataSaga(action) {
    try {
        const response = yield call(editOPCService, { ...action.param });
        if (response.status) {
            yield put(AddDataAction.editDataSuccess(response));
            NotificationManager.success('Server Info updated successfully!');

            //REFRESH
            const payload = { clientId: action.param.clientId }
            yield put(AddDataAction.listDataRequest(payload));
        } else {
            yield put(AddDataAction.editDataFailed('Failed to update Server Info'));
            NotificationManager.error('Failed to update Server Info. Please try again.');
        }
    } catch (error) {
        yield put(AddDataAction.editDataFailed(error.message || 'Something went wrong'));
        NotificationManager.error('Failed to update Server Info. Please try again.');
    }
}

export default function* addDataRootWatcher() {
    yield takeLatest(AddDataType.ADD_DATA_REQUEST, addDataSaga);
    yield takeLatest(AddDataType.LIST_DATA_REQUEST, listDataSaga);
    yield takeLatest(AddDataType.VARIABLE_DATA_REQUEST, variableDataSaga);
    yield takeLatest(AddDataType.ADD_VARIABLE_DATA_REQUEST, addVariableDataSaga);
    yield takeLatest(AddDataType.DELETE_DATA_REQUEST, deleteDataSaga);
    yield takeLatest(AddDataType.EDIT_DATA_REQUEST, editDataSaga);
}