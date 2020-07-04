import { ActionTypes } from './types';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Console } from 'console';
import { setAlert } from './alert';

interface AddPostAction {
  type: ActionTypes;
  payload: AddPostPayload;
}

interface AddPostPayload {
  msg: string;
  id?: number;
}
export interface DeletePostAction{
  type: ActionTypes.DELETE_POST,
  payload: number;
}

const { ADD_POST, ERROR_ADD_POST, DELETE_POST } = ActionTypes;
export const addPost = (formData: FormData) => async (dispatch: Dispatch) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  try {
    const response = await axios.post('/add-post', formData, config);

    dispatch<AddPostAction>({
      type: ADD_POST,
      payload: response.data,
    });

    dispatch<any>(setAlert(response.data.msg, 'success'));
  } catch (error) {
    dispatch<any>(setAlert(error.response.data.msg, 'danger'));
  }
};

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  try {
    console.log(postId);
    const response = await axios.delete(`/delete-post/${postId}`);
    dispatch<DeletePostAction>({
        type: DELETE_POST,
        payload: postId
    });
  } catch (error) {
      console.log(error)
    dispatch<any>(setAlert(error.response.data.msg, 'danger'));
  }
};
