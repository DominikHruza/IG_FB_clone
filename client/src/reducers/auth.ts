import { ActionTypes } from '../actions/types';
import {} from '../actions/auth';
import { RegisterAction } from '../actions/auth';
const { REGISTER_FAIL, REGISTER_SUCCESS } = ActionTypes;

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action: RegisterAction) {
  const { type, payload } = action;

  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
