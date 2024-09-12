import { createActions } from "reduxsauce";

export const { Types: LoginTypes, Creators: LoginActions } = createActions({
    loginRequest: ["credentials"],
    loginSuccess: ["res"],
    loginFailed: ["error"],
    resetLoginResponse: null
  });

  export const initialState = {
    loading: false,
    error: null,
    loginResponse: false,
  };
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LoginTypes.LOGIN_REQUEST:
        console.log(action, "reducer");
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LoginTypes.LOGIN_SUCCESS:
        return {
          ...state,
          loginResponse: action.res,
          loading: false,
          
        };
      case LoginTypes.LOGIN_FAILED:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
        case LoginTypes.RESET_LOGIN_RESPONSE:
          return {
            ...state,
            loginResponse: false,
          };
      default:
        return state;
    }
  };