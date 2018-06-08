import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const user = await axios.get("/auth/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};

export const handleToken = token => async dispatch => {
  console.log("handleToken : ", token);
  const user = await axios.post("/auth/addcredits", token);
  dispatch({
    type: FETCH_USER,
    payload: user.data
  });
};