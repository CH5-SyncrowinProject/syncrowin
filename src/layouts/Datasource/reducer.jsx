import { createActions } from "reduxsauce";

export const { Types: AddDataType, Creators: AddDataAction } = createActions({
    addDataRequest: ["param"],
    addDataSuccess: ["res"],
    addDataFailed: ["error"],
    addDataSuccessAction: null,
    addDataResetAction: null,

    //list
    listDataRequest: ['payload'],  // Ensure this is correct
    listDataSuccess: ['dashboards'],
    listDataFailed: ['error'],

    //variable
    variableDataRequest: ['payload'],
    variableDataSuccess: ['variables'],
    variableDataFailed: ['error'],

    //add
    addVariableDataRequest: ['payload'],
    addVariableDataSuccess: ['variables'],
    addVariableDataFailed: ['error'],

    //delete
    deleteDataRequest: ['param'],
    deleteDataSuccess: ['res'],
    deleteDataFailed: ['error'],

    //edit
    editDataRequest: ['param'],
    editDataSuccess: ['res'],
    editDataFailed: ['error'],
});

const initialState = {
    loading: false,
    error: null,
    data: [],
    varData: [],

    addDataResponse: null,
    addDataSuccess: false,
    addDataFailed: null,

    //list
    listDataSuccess: false,
    listDataFailed: null,

    //varibale
    variableDataSuccess: false,
    variableDataFailed: null,

    //add
    addVariableDataSuccess: false,
    addVariableDataFailed: null,

    //delete
    deleteDataResponse: null,
    deleteDataSuccess: false,
    deleteDataFailed: null,

    //edit
    editDataResponse: null,
    editDataSuccess: false,
    editDataFailed: null,
}

export const addDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case AddDataType.ADD_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addDataSuccess: false,
                addDataFailed: null
            };
        case AddDataType.ADD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                addDataResponse: {
                    data: action.res.data,
                    status: action.res.status,
                    statusText: action.res.statusText
                },
                addDataSuccess: true,
                addDataFailed: null
            };
        case AddDataType.ADD_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                addDataSuccess: false,
                addDataFailed: action.error
            };
        case AddDataType.ADD_DATA_RESET_ACTION:
            return initialState;

        //Edit
        case AddDataType.EDIT_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                editDataSuccess: false,
                editDataFailed: null
            };
        case AddDataType.EDIT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                editDataResponse: action.res,
                editDataSuccess: true,
                editDataFailed: null
            };
        case AddDataType.EDIT_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                editDataSuccess: false,
                editDataFailed: action.error
            };

        //list
        case AddDataType.LIST_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                listDataSuccess: false,
                listDataFailed: null
            };
        case AddDataType.LIST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.dashboards,  // Ensure this line stores the API data correctly
                listDataSuccess: true,
                listDataFailed: null
            };
        case AddDataType.LIST_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,  // Use correct action property
                listDataSuccess: false,
                listDataFailed: action.error
            };

        //variabe
        case AddDataType.VARIABLE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                variableDataSuccess: false,
                variableDataFailed: null
            };
        case AddDataType.VARIABLE_DATA_SUCCESS:
            console.log(action.variables, "reducer var data");
            return {
                ...state,
                loading: false,
                varData: [...state.varData, ...action.variables],
                variableDataSuccess: true,
                variableDataFailed: null
            };
        case AddDataType.VARIABLE_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,  // Use correct action property
                variableDataSuccess: false,
                variableDataFailed: action.error
            };

        //add
        case AddDataType.ADD_VARIABLE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                addVariableDataSuccess: false,
                addVariableDataFailed: null
            };

        case AddDataType.ADD_VARIABLE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                addVariableDataSuccess: true,
                addVariableDataFailed: null,
                variables: [...state.variables, ...action.payload.variables] // Append added variables
            };

        case AddDataType.ADD_VARIABLE_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,  // Assign the error message from action
                addVariableDataSuccess: false,
                addVariableDataFailed: action.error
            };

        // Delete
        case AddDataType.DELETE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                deleteDataSuccess: false,
                deleteDataFailed: null
            };
        case AddDataType.DELETE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteDataResponse: action.res,
                deleteDataSuccess: true,
                deleteDataFailed: null
            };
        case AddDataType.DELETE_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                deleteDataSuccess: false,
                deleteDataFailed: action.error
            };

        default:
            return state;
    }
}