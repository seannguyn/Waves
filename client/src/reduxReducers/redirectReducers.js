// contain initial and dispatch {type: action}
import {
    REDIRECT,
    CLEAR_LINK,
} from '../reduxActions/types';

const initialState = {link:"/user/dashboard"};

export default function(state = initialState, action) {
  switch (action.type) {
    case REDIRECT:
        return {...state, link: action.payload}
    case CLEAR_LINK:
        return {...state, link: action.payload}
    default:
      return state;
  }
}