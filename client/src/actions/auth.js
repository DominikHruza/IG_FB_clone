import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alerts';
import axios from 'axios';

export const signUp = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post('/sign-up', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};
