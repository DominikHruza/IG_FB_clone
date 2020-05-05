import { ADD_POST } from './types';
import axios from 'axios';

export const addPost = (formData) => async (dispatch) => {
  /* const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }; */
  const response = await axios.post('/add-post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(response);
};
