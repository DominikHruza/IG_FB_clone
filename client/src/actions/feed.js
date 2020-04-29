import {
  GET_FEED,
  FEED_ERROR,
  UPDATE_LIKES,
  REMOVE_LIKES,
} from '../actions/types';
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

export const addLike = (postId, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(postId, userId);
  const body = JSON.stringify({ postId, userId });
  try {
    const response = await axios.put('/feed/add-like', body, config);
    console.log(response.data);
    dispatch({
      type: UPDATE_LIKES,
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

export const removeLike = (postId, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ postId, userId });
  try {
    const response = await axios.put('/feed/delete-like', body, config);
    console.log(response.data);
    dispatch({
      type: REMOVE_LIKES,
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
