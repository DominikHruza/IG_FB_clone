import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import axios from 'axios';

export interface FeedAction {
    type: ActionTypes.GET_FEED |  
          ActionTypes.ERROR_FEED | 
          ActionTypes.ADD_LIKE | 
          ActionTypes.REMOVE_LIKE
    payload: Post[]  | any
}

export interface Post {
    postId: number
    userId: number
    username: string
    description: string
    imgUrl: string
    likes: Like[]
    comments: Comment[]
}

export interface Comment {
   commentId: number
   userId: number
   commentee: string
   createdAt: string
   commentText: string 
}

export interface Like {
     count: number
     userId: number
}

const{GET_FEED, ERROR_FEED, ADD_LIKE, REMOVE_LIKE} = ActionTypes
export const getPosts = (count:number) => async (dispatch:Dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ count });
    try {
      const response = await axios.post('/feed', body, config);
      console.log(response.data)
      dispatch<FeedAction>({
        type: GET_FEED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_FEED,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const addLike = (postId:number, userId:number) => async (dispatch: Dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(postId, userId);
    const body = JSON.stringify({ postId, userId });
    try {
      const response = await axios.put('/feed/add-like', body, config);
  
      dispatch({
        type: ADD_LIKE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_FEED,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

  export const removeLike = (postId:number, userId:number) => async (dispatch:Dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const body = JSON.stringify({ postId, userId });
    try {
      const response = await axios.put('/feed/delete-like', body, config);
  
      dispatch({
        type: REMOVE_LIKE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_FEED,
        payload: {
          msg: error.response,
          status: error.response.status,
        },
      });
    }
  };