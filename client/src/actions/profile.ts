import { Dispatch } from 'redux';
import { ActionTypes } from '../actions/types';
import axios from 'axios';
import { ErrorMsg } from './auth';

const { ERROR_PROFILE, GET_PROFILE } = ActionTypes;

export interface ProfileAction {
  type: ActionTypes;
  payload: ProfileActionPayload | ErrorMsg;
}

export interface ProfileActionPayload {
  id: number;
  userName: string;
  photos: Photo[];
  followers: Following<number, User[]>;
  follows: Following<number, User[]>;
}

interface Following<T, U> {
  count: T;
  usersList: U;
}

export interface User {
  id: number;
  username: string;
}

export interface Photo {
  username: string;
  photoId: number;
  userId: number;
  likesNum: number;
  comments: Comment[];
}

export interface Comment {
  username: string;
  comment_text: string;
  created_at: string;
}

export const getUserProfile = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/user/${id}`);
    dispatch<ProfileAction>({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    dispatch<ProfileAction>({
      type: ERROR_PROFILE,
      payload: error.msg,
    });
  }
};
