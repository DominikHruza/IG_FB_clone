import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { SignInData } from '../components/SignIn/SignIn';
import { LogInData } from '../components/LogIn/Login';
import { setAlert } from './alert';
import setAuthToken from '../utils/setToken';

const {
  AUTH_ERROR,
  AUTH_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} = ActionTypes;

export interface TokenString extends AuthUser {
  token: string;
}

export interface AuthAction {
  type: ActionTypes;
  payload: TokenString | AuthUser | null;
}

export interface ErrorMsg {
  msg: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
}
//Register action
export const userRegister = ({
  username,
  email,
  password,
}: SignInData) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post<TokenString>('/sign-up', body, config);
    dispatch<AuthAction>({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error: ErrorMsg) =>
        dispatch<any>(setAlert(error.msg, 'danger'))
      );
    }
    dispatch<AuthAction>({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

//Login action
export const userLogin = ({ email, password }: LogInData) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post<TokenString>('/login', body, config);
    dispatch<AuthAction>({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error: ErrorMsg) =>
        dispatch<any>(setAlert(error.msg, 'danger'))
      );
    }

    dispatch<AuthAction>({
      type: LOGIN_FAIL,
      payload: error,
    });
  }
};

//Logout action
export const userLogout = () => (dispatch: Dispatch) => {
  console.log('pozvo');
  dispatch<AuthAction>({
    type: LOGOUT,
    payload: null,
  });
};

export const loadUser = () => async (dispatch: Dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get('/get-user');
    console.log('uso');
    dispatch<AuthAction>({
      type: AUTH_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch<AuthAction>({
      type: AUTH_ERROR,
      payload: null,
    });
  }
};
