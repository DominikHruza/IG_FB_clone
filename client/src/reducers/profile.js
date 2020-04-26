import { ERROR_PROFILE, GET_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: null,
};

const userProfile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: null,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default userProfile;
