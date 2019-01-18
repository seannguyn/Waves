// contain initial and dispatch {type: action}
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../reduxActions/types';

const initialState = {success:false};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
        return { ...state, success: action.payload.success, user: action.payload.userData }
    case REGISTER_USER:
        return {...state, success: action.payload.success, user: action.payload.userData }
    case AUTH_USER:
        console.log("request auth", action.payload);
        if (action.payload.validToken === true) {
            return {...state, success: action.payload.success, user: action.payload.userData}
        } else {
            return state;
        }
    case LOGOUT_USER:
        return { ...state, success: action.payload.success, user: action.payload.userData }
        
    default:
      return state;
  }
}