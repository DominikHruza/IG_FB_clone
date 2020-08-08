import {
  ERROR_PROFILE,
  GET_PROFILE,
  ADD_POST,
  DELETE_POST,
} from "../actions/types";

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
    case DELETE_POST:
      console.log(state.profile.photos);
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: state.profile.photos.filter(
            (photo) => photo.photoId !== payload
          ),
        },
      };

    default:
      return state;
  }
};

export default userProfile;
