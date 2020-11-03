import _ from "lodash";
import {
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
} from "../actions/types";

export const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      const fetchedStreams = _.mapKeys(action.payload, "id");
      return { ...state, ...fetchedStreams };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
