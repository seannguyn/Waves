// contain initial and dispatch {type: action}
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SERVER_ADD_CART,
    SERVER_REMOVE_CART,
    USER_PURCHASE_ITEM,
    UPDATE_PROFILE,
    RESET_PASSWORD
} from '../reduxActions/types';

const initialState = {success:false};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
        return { ...state, success: action.payload.success, user: action.payload.userData }
    case REGISTER_USER:
        return {...state, success: action.payload.success, user: action.payload.userData }
    case AUTH_USER:
        if (action.payload.validToken === true) {
            return {...state, success: action.payload.success, user: action.payload.userData}
        } else {
            return state;
        }
    case LOGOUT_USER:
        return { ...state, success: action.payload.success, user: action.payload.userData }

    case SERVER_ADD_CART: 
    
        if (action.payload.success) {
            return { 
                ...state, 
                user: {
                    ...state.user,
                    cart: action.payload.cart
                } 
            }
        } else {
            return { 
                ...state, 
            }
        }
    case SERVER_REMOVE_CART:
        return { ...state, success: action.payload.success, user: action.payload.userData }
    
    case USER_PURCHASE_ITEM: 
        return { ...state, success: action.payload.success, user: action.payload.userData }

    case UPDATE_PROFILE:
        return { ...state, success: action.payload.success, user: action.payload.userData }
    case RESET_PASSWORD:
        return state;
    default:
      return state;
  }
}