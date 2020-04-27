import { ERROR_PROFILE, GET_PROFILE } from '../actions/types';
import axios from 'axios';

export const getUserProfile = (id) => async (dispatch) => {
  const response = await axios.get(`/user/${id}`);
  console.log(response);
  dispatch({
    type: GET_PROFILE,
    payload: response.data,
  });
};
