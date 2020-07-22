import {SET_NAME, SET_SOCKET} from "./actions";

const initialState = {
  socket: null,
  name: localStorage.getItem('from') || ''
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state
  }
}
