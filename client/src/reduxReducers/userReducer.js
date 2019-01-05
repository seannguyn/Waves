// import { FETCH_POSTS, NEW_POST } from '../actions/types';

// contain initial and dispatch {type: action}
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../reduxActions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
        return { ...state, user: action.payload.user }
    default:
      return state;
  }
}