import { createActions } from "reduxsauce";

export const { Types: ProfileTypes, Creators: ProfileActions } = createActions({
    getUserDetailsRequest: ['userId'],
  getUserDetailsSuccess: ['userData'],
  getUserDetailsFailure: ['error'],
  });

  export const initialState = {
    user: {
        data:
        {}
    },
    loading: false,
    error: null,
  };
  export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case ProfileTypes.GET_USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ProfileTypes.GET_USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.userData,
        };
      case ProfileTypes.GET_USER_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  