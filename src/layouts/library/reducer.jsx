import { createActions } from 'reduxsauce';

export const { Types: AssetDetailTypes, Creators: AssetDetailActions } = createActions({
    assetDetailRequest: ['payload'],
    assetDetailSuccess: ['payload'],
    assetDetailFailure: ['payload'],

    childAssetDetailRequest: ['payload'],
    childAssetDetailSuccess: ['payload'],
    childAssetDetailFailure: ['payload'],

    fetchAssetByIdRequest: ['assetId'],
    fetchAssetByIdSuccess: ['asset'],
    fetchAssetByIdFailure: ['error'],

    editAssetDetail: ['assetId', 'newDetails'],
    editAssetDetailSuccess: ['payload'],
    editAssetDetailFailure: ['error'],

    deleteAssetRequest: ['payload'],
    deleteAssetSuccess: ['assetId'],
    deleteAssetFailure: ['error'],

    fetchEventsByAssetIdRequest: ['assetId'],
    fetchEventsByAssetIdSuccess: ['events'],
    fetchEventsByAssetIdFailure: ['error'],

    //detail
    detailEventRequest: ['assetId'],
    detailEventSuccess: ['events'],
    detailEventFailed: ['error'],
    detailEventSuccessAction: null,
    detailEventAction: null,

    //EDIT
    editEventRequest: ["param"],
    editEventSuccess: ["res"],
    editEventFailed: ["error"],
    editEventSuccessAction: null,
    editEventAction: null,

    //multi
    multiEventRequest: ["param"],
    multiEventSuccess: ["res"],
    multiEventFailed: ["error"],
    multiEventSuccessAction: null,
    multiEventAction: null,

    //delete
    deleteEventRequest: ["param"],
    deleteEventSuccess: ["res"],
    deleteEventFailed: ["error"],
    deleteEventSuccessAction: null,
    deleteEventAction: null,

    //calender
    fetchMaintenancesByAssetIdRequest: ['assetId'],
    fetchMaintenancesByAssetIdSuccess: ['events'],
    fetchMaintenancesByAssetIdFailure: ['error'],

    //add calender 
    AddMaintenanceRequest: ["param"],
    AddMaintenanceSuccess: ["res"],
    AddMaintenanceFailed: ["error"],
    AddMaintenanceSuccessAction: null,
    AddMaintenanceAction: null,

    //Edit calender 
    EditMaintenanceRequest: ["param"],
    EditMaintenanceSuccess: ["res"],
    EditMaintenanceFailed: ["error"],
    EditMaintenanceSuccessAction: null,
    EditMaintenanceAction: null,
});

export const initialState = {
    assets: [],
    childAssets: [],
    asset: null,
    loading: false,
    error: null,
    assetIds: [],
    events: [],
    eventLoading: false,
    eventError: null,

    //Detail
    detailEventResponse: null,
    detailEventSuccess: false,
    detailEventFailed: null,

    //EDIT
    editEventResponse: null,
    editEventSuccess: false,
    editEventFailed: null,

    //multi
    multiEventResponse: null,
    multiEventSuccess: false,
    multiEventFailed: null,

    //delete
    deleteEventResponse: null,
    deleteEventSuccess: false,
    deleteEventFailed: null,

    //calender
    Maintenances: [],
    MaintenanceLoading: false,
    MaintenanceError: null,

    //add calender event
    AddMaintenanceResponse: null,
    AddMaintenanceSuccess: false,
    AddMaintenanceFailed: null,

    //Edit calender event
    EditMaintenanceResponse: null,
    EditMaintenanceSuccess: false,
    EditMaintenanceFailed: null,
};

export const assetDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case AssetDetailTypes.ASSET_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };

        case AssetDetailTypes.ASSET_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                assets: action.payload,
                assetIds: action.payload.map(asset => asset.assetId),
            };

        case AssetDetailTypes.ASSET_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case AssetDetailTypes.CHILD_ASSET_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case AssetDetailTypes.CHILD_ASSET_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                childAssets: action.payload, // Update with the payload containing child assets
            };

        case AssetDetailTypes.CHILD_ASSET_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case AssetDetailTypes.FETCH_ASSET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case AssetDetailTypes.FETCH_ASSET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                asset: action.asset
            };

        case AssetDetailTypes.FETCH_ASSET_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case AssetDetailTypes.EDIT_ASSET_DETAIL:
            return {
                ...state,
                assets: state.assets.map(asset =>
                    asset.assetId === action.assetId ? { ...asset, ...action.newDetails } : asset
                ),
                assetIds: state.assets.map(asset => asset.assetId),
            };

        case AssetDetailTypes.EDIT_ASSET_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case AssetDetailTypes.EDIT_ASSET_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case AssetDetailTypes.DELETE_ASSET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case AssetDetailTypes.DELETE_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                assets: state.assets.filter(asset => asset.assetId !== action.assetId),
                assetIds: state.assetIds.filter(id => id !== action.assetId),
            };

        case AssetDetailTypes.DELETE_ASSET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case AssetDetailTypes.FETCH_EVENTS_BY_ASSET_ID_REQUEST:
            return { ...state, eventLoading: true, eventError: null };

        case AssetDetailTypes.FETCH_EVENTS_BY_ASSET_ID_SUCCESS:
            return {
                ...state,
                eventLoading: false,
                events: action.events,
            };

        case AssetDetailTypes.FETCH_EVENTS_BY_ASSET_ID_FAILURE:
            return {
                ...state,
                eventLoading: false,
                eventError: action.error,
            };

        //EDIT
        case AssetDetailTypes.EDIT_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                editEventSuccess: false,
                editEventFailed: null,
            };
        case AssetDetailTypes.EDIT_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                editEventResponse: action.res,
                editEventSuccess: true,
                editEventFailed: null,
            };
        case AssetDetailTypes.EDIT_EVENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                editEventSuccess: false,
                editEventFailed: action.error,
            };
        case AssetDetailTypes.EDIT_EVENT_RESET_ACTION:
            return initialState;

        //multi
        case AssetDetailTypes.MULTI_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                multiEventSuccess: false,
                multiEventFailed: null,
            };
        case AssetDetailTypes.MULTI_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                multiEventResponse: action.res,
                multiEventSuccess: true,
                multiEventFailed: null,
            };
        case AssetDetailTypes.MULTI_EVENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                multiEventSuccess: false,
                multiEventFailed: action.error,
            };
        case AssetDetailTypes.MULTI_EVENT_RESET_ACTION:
            return initialState;

        //detail
        case AssetDetailTypes.DETAIL_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                detailEventSuccess: false,
                detailEventFailed: null,
            };
        case AssetDetailTypes.DETAIL_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                detailEventResponse: action.res,
                detailEventSuccess: true,
                detailEventFailed: null,
            };
        case AssetDetailTypes.DETAIL_EVENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                detailEventSuccess: false,
                detailEventFailed: action.error,
            };
        case AssetDetailTypes.DETAIL_EVENT_RESET_ACTION:
            return initialState;

        //delete
        case AssetDetailTypes.DELETE_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                deleteEventSuccess: false,
                deleteEventFailed: null,
            };
        case AssetDetailTypes.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteEventResponse: {
                    data: action.res.data,
                    status: action.res.status,
                    statusText: action.res.statusText
                },
                deleteEventSuccess: true,
                deleteEventFailed: null,
            };
        case AssetDetailTypes.DELETE_EVENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                deleteEventSuccess: false,
                deleteEventFailed: action.error,
            };
        case AssetDetailTypes.DELETE_EVENT_RESET_ACTION:
            return initialState;

        //calender
        case AssetDetailTypes.FETCH_MAINTENANCES_BY_ASSET_ID_REQUEST:
            return { ...state, MaintenanceLoading: true, MaintenanceError: null };

        case AssetDetailTypes.FETCH_MAINTENANCES_BY_ASSET_ID_SUCCESS:
            console.log('Reducer action payload:', action.events);
            return {
                ...state,
                MaintenanceLoading: false,
                Maintenances: action.events, // This should be an array
            };

        case AssetDetailTypes.FETCH_MAINTENANCES_BY_ASSET_ID_FAILURE:
            return {
                ...state,
                MaintenanceLoading: false,
                MaintenanceError: action.error,
            };

        //add calender 
        case AssetDetailTypes.ADD_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                AddMaintenanceSuccess: false,
                AddMaintenanceFailed: null,
            };
        case AssetDetailTypes.ADD_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                AddMaintenanceResponse: action.res,
                AddMaintenanceSuccess: true,
                AddMaintenanceFailed: null,
            };
        case AssetDetailTypes.ADD_MAINTENANCE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                AddMaintenanceSuccess: false,
                AddMaintenanceFailed: action.error,
            };
        case AssetDetailTypes.ADD_MAINTENANCE_RESET_ACTION:
            return initialState;

        //Edit calender 
        case AssetDetailTypes.EDIT_MAINTENANCE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                EditMaintenanceSuccess: false,
                EditMaintenanceFailed: null,
            };
        case AssetDetailTypes.EDIT_MAINTENANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                EditMaintenanceResponse: action.res,
                EditMaintenanceSuccess: true,
                EditMaintenanceFailed: null,
            };
        case AssetDetailTypes.EDIT_MAINTENANCE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                EditMaintenanceSuccess: false,
                EditMaintenanceFailed: action.error,
            };
        case AssetDetailTypes.EDIT_MAINTENANCE_RESET_ACTION:
            return initialState;

        default:
            return state;
    }
};

