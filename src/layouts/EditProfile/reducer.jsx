import { createActions } from "reduxsauce";

export const { Types: EditProfileTypes, Creators: EditProfileActions } = createActions({
  updateProfileRequest: ['userId', 'userData'],
  updateProfileSuccess: ['updatedUser'],
  updateProfileFailure: ['error']
});
export const INITIAL_STATE = {
  user: {},
  loading: false,
  error: null
};

export const editProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EditProfileTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case EditProfileTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.updatedUser,
        loading: false,
        error: null
      };

    case EditProfileTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

