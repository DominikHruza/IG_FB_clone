import { ActionTypes } from '../actions/types';
import { AuthAction } from '../actions/auth';
import { TokenString } from '../actions/auth';
import { AuthUser } from '../actions/auth';

const {
  AUTH_ERROR,
  AUTH_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} = ActionTypes;

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: AuthUser | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action: AuthAction) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      if (payload) {
        instanceOfAuthUser(payload);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
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

function instanceOfAuthUser(object: any): object is AuthUser {
  localStorage.setItem('token', object.token);
  return true;
}
