import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import axios from 'axios';


const{GET_FEED, ERROR_GET_FEED} = ActionTypes
export const getPosts = (count:any) => async (dispatch:Dispatch) => {
    console.log(count);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ count });
    try {
      const response = await axios.post('/feed', body, config);
      dispatch({
        type: GET_FEED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_GET_FEED,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };