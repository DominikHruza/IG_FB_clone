import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { SignInData } from '../components/SignIn/SignIn';
const { REGISTER_SUCCESS, REGISTER_FAIL } = ActionTypes;

export interface TokenString {
  token: string;
}

export interface RegisterAction {
  type: ActionTypes;
  payload?: TokenString;
}

export const userRegister = ({
  username,
  email,
  password,
}: SignInData) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'appliction/json',
    },
  };

  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post<TokenString>('/sign-up');

    dispatch<RegisterAction>({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch<RegisterAction>({
      type: REGISTER_FAIL,
    });
  }
};
