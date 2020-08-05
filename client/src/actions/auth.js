import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

import { setAlert } from "./alerts";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get("/get-user");
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signUp = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const response = await axios.post("/sign-up", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  console.log("action: ", email, password);
  try {
    const response = await axios.post("/login", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
