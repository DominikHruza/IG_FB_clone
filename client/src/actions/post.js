import { ADD_POST, DELETE_POST } from "./types";
import axios from "axios";

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const response = await axios.post("/add-post", formData, config);
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete-post/${postId}`);
    console.log(response);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};
