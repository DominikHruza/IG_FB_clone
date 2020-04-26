import { ERROR_PROFILE, GET_PROFILE } from '../actions/types';
import axios from 'axios';
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await axios.get(`/user/${userId}`);
  console.log(response);
};
