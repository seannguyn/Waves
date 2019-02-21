// contain initial and dispatch {type: action}
import {
    LOCAL_ADD_CART,
    LOCAL_INIT_CART,
    LOCAL_CART_CLEAR,
    LOCAL_REMOVE_CART_ITEM
} from '../reduxActions/types';

const initialState = {localCart:[]};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCAL_ADD_CART:
        return {...state, localCart: action.payload}
    case LOCAL_INIT_CART:
        return {...state, localCart: action.payload}
    case LOCAL_CART_CLEAR:
        return {...state, localCart: action.payload}
    case LOCAL_REMOVE_CART_ITEM:
        return {...state, localCart: action.payload}
    default:
      return state;
  }
}