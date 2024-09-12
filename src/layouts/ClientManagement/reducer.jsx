import { createActions } from 'reduxsauce';

export const { Types: ClientManagementTypes, Creators: ClientManagementActions } = createActions({
  fetchUsersRequest: null,
  fetchUsersSuccess: ['users'],
  fetchUsersFailure: ['error'],

  //add client
  addClientRequest: ["param"],
  addClientSuccess: ["res"],
  addClientFailed: ["error"],
  addClientSuccessAction: null,
  addClientResetAction: null,
});

export const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const clientManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ClientManagementTypes.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case ClientManagementTypes.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.users };

    case ClientManagementTypes.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export const addClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case addClientTypes.ADD_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case addClientTypes.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        addClientResponse: action.res,
        addClientSuccess: true
      };

    case addClientTypes.ADD_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case addClientTypes.ADD_CLIENT_SUCCESS_ACTION:
      return {
        ...state,
        addClientSuccess: true
      };

    case addClientTypes.ADD_CLIENT_RESET_ACTION:
      return {
        ...state,
        addClientSuccess: false,
        addClientResponse: null
      };

    default:
      return state;
  }
};
