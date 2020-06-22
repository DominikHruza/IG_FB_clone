import { ActionTypes } from '../actions/types';
import { ProfileAction, ProfileActionPayload } from '../actions/profile';

const { ERROR_PROFILE, GET_PROFILE } = ActionTypes;

export interface ProfileState {
  profile: ProfileActionPayload | null;
  loading: Boolean;
  error?: any;
}

const initialState = {
  profile: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action: ProfileAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
