import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  const user = await axios.get("/auth/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const handleToken = token => async dispatch => {
  const user = await axios.post("/auth/addcredits", token);
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const submitSurvey = (values, history) => async dispatch => {
  const user = await axios.post("/auth/survey", values);
  history.push("/surveys");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const fetchSurveys = () => async dispatch => {
  const surveys = await axios.get("/auth/surveys");
  console.log("List of surveys : ", surveys);
  dispatch({ type: FETCH_SURVEYS, payload: surveys.data });
};
