import { GET_FEED, FEED_ERROR } from '../actions/types';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/feed');
    dispatch({
      type: GET_FEED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FEED_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
