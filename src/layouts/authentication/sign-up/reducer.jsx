import { createActions } from "reduxsauce";

export const { Types: SignupTypes, Creators: SignupActions } = createActions({
    signupRequest: ["param"],
    signupSuccess: ["res"],
    signupFailed: ["error"],
    signupSuccessAction: null,
    signupResetAction: null,
});

export const initialState = {
    loading: false,
    error: null,
    signupResponse: null,
    signupSuccess: false,
    signupFailed: null
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SignupTypes.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,  // Clear previous errors on new request
            };

        case SignupTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                signupResponse: action.res,
                signupSuccess: true,
            };

        case SignupTypes.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case SignupTypes.SIGNUP_SUCCESS_ACTION:
            return {
                ...state,
                signupSuccess: true,
            };

        case SignupTypes.SIGNUP_RESET_ACTION:
            return {
                ...state,
                signupSuccess: false,
                signupResponse: null,
            };

        default:
            return state;
    }
};
