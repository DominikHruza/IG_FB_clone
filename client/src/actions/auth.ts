import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { SignInData } from '../components/SignIn/SignIn';
import { LogInData } from '../components/LogIn/Login';
import { setAlert, AlertAction } from './alert';

const {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} = ActionTypes;

export interface TokenString {
  token: string;
}

export interface AuthAction {
  type: ActionTypes;
  payload?: TokenString | ErrorMsg;
}

export interface ErrorMsg {
  msg: string;
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
    });
  }
};

//Logout action
export const userLogout = () => (dispatch: Dispatch) => {
  console.log('pozvo');
  dispatch<AuthAction>({
    type: LOGOUT,
  });
};
