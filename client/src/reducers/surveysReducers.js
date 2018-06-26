import { FETCH_SURVEYS } from "../actions/types";

export default (store = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload || false;
    default:
      return store;
  }
};
