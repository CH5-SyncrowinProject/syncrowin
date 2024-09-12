import { createActions } from "reduxsauce";

export const { Types: AddAssetTypes, Creators: AddAssetActions } = createActions({
    addAssetRequest: ["param"],
    addAssetSuccess: ["res"],
    addAssetFailed: ["error"],
    addAssetSuccessAction: null,
    addAssetResetAction: null,
    setAssetId: ["assetId"], // Add this action
});

const initialState = {
    loading: false,
    error: null,
    addAssetResponse: null,
    addAssetSuccess: false,
    addAssetFailed: null,
    assetId: null, // Add this field
};

export const addAssetReducer = (state = initialState, action) => {
    switch (action.type) {
        case AddAssetTypes.ADD_ASSET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addAssetSuccess: false,
                addAssetFailed: null,
            };
        case AddAssetTypes.ADD_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                addAssetResponse: {
                    data: action.res.data,
                    status: action.res.status,
                    statusText: action.res.statusText
                },
                addAssetSuccess: true,
                addAssetFailed: null,
                assetId: action.res.data.assetId,
            };
        case AddAssetTypes.ADD_ASSET_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addAssetSuccess: false,
                addAssetFailed: action.error,
            };
        case AddAssetTypes.SET_ASSET_ID:
            return {
                ...state,
                assetId: action.assetId,
            };
        case AddAssetTypes.ADD_ASSET_RESET_ACTION:
            return initialState;
        default:
            return state;
    }
};

//Add operation info
export const { Types: AddOperationalInfoTypes, Creators: AddOperationalInfoActions } = createActions({
    addOperationalInfoRequest: ["param"],
    addOperationalInfoSuccess: ["res"],
    addOperationalInfoFailed: ["error"],
    addOperationalInfoSuccessAction: null,
    addOperationalInfoAction: null,
});

export const initialState2 = {
    loading: false,
    error: null,
    addOperationalInfoResponse: null,
    addOperationalInfoSuccess: false,
    addOperationalInfoFailed: null
};

export const addOperationalInfoReducer = (state = initialState2, action) => {
    switch (action.type) {
        case AddOperationalInfoTypes.ADD_OPERATIONAL_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addOperationalInfoSuccess: false,
                addOperationalInfoFailed: null,
            };
        case AddOperationalInfoTypes.ADD_OPERATIONAL_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                addOperationalInfoResponse: action.res,
                addOperationalInfoSuccess: true,
                addOperationalInfoFailed: null,
            };
        case AddOperationalInfoTypes.ADD_OPERATIONAL_INFO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addOperationalInfoSuccess: false,
                addOperationalInfoFailed: action.error,
            };
        case AddOperationalInfoTypes.ADD_OPERATIONAL_INFO_RESET_ACTION:
            return initialState2;
        default:
            return state;
    }
};

//Add support contact info
export const { Types: AddSupportContactTypes, Creators: AddSupportContactActions } = createActions({
    addSupportContactRequest: ["param"],
    addSupportContactSuccess: ["res"],
    addSupportContactFailed: ["error"],
    addSupportContactSuccessAction: null,
    addSupportContactAction: null,
});

export const initialState3 = {
    loading: false,
    error: null,
    addSupportContactResponse: null,
    addSupportContactSuccess: false,
    addSupportContactFailed: null
};

export const addSupportContactReducer = (state = initialState3, action) => {
    switch (action.type) {
        case AddSupportContactTypes.ADD_SUPPORT_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addSupportContactSuccess: false,
                addSupportContactFailed: null,
            };
        case AddSupportContactTypes.ADD_SUPPORT_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                addSupportContactResponse: action.res,
                addSupportContactSuccess: true,
                addSupportContactFailed: null,
            };
        case AddSupportContactTypes.ADD_SUPPORT_CONTACT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addSupportContactSuccess: false,
                addSupportContactFailed: action.error,
            };
        case AddSupportContactTypes.ADD_SUPPORT_CONTACT_RESET_ACTION:
            return initialState3;
        default:
            return state;
    }
};

//Add event info
export const { Types: AddEventTypes, Creators: addEventActions } = createActions({
    addEventRequest: ["param"],
    addEventSuccess: ["res"],
    addEventFailed: ["error"],
    addEventSuccessAction: null,
    addEventAction: null,
});

export const initialState4 = {
    loading: false,
    error: null,
    addEventResponse: null,
    addEventSuccess: false,
    addEventFailed: null
};

export const addEventReducer = (state = initialState4, action) => {
    switch (action.type) {
        case AddEventTypes.ADD_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addEventSuccess: false,
                addEventFailed: null,
            };
        case AddEventTypes.ADD_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                addEventResponse: action.res,
                addEventSuccess: true,
                addEventFailed: null,
            };
        case AddEventTypes.ADD_EVENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addEventSuccess: false,
                addEventFailed: action.error,
            };
        case AddEventTypes.ADD_EVENT_RESET_ACTION:
            return initialState4;
        default:
            return state;
    }
};

//Add maintenance info
export const { Types: AddMaintenanceTypes, Creators: addMaintenanceActions } = createActions({
    addCalenderRequest: ["param"],
    addCalenderSuccess: ["res"],
    addCalenderFailed: ["error"],
    addCalenderSuccessAction: null,
    addCalenderAction: null,
});

export const initialState5 = {
    loading: false,
    error: null,
    addCalenderResponse: null,
    addCalenderSuccess: false,
    addCalenderFailed: null
};

export const addMaintenanceReducer = (state = initialState4, action) => {
    switch (action.type) {
        case AddMaintenanceTypes.ADD_CALENDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addCalenderSuccess: false,
                addCalenderFailed: null,
            };
        case AddMaintenanceTypes.ADD_CALENDER_SUCCESS:
            return {
                ...state,
                loading: false,
                addMaintenanceResponse: action.res,
                addCalenderSuccess: true,
                addCalenderFailed: null,
            };
        case AddMaintenanceTypes.ADD_CALENDER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addCalenderSuccess: false,
                addCalenderFailed: action.error,
            };
        case AddMaintenanceTypes.ADD_CALENDER_RESET_ACTION:
            return initialState4;
        default:
            return state;
    }
};