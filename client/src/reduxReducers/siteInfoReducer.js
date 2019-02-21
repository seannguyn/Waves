// contain initial and dispatch {type: action}
import {
    EDIT_SITE_INFO,
    FETCH_SITE_INFO,
} from '../reduxActions/types';

const initialState = {success: false, siteInfo:[{}]};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_SITE_INFO:
        return {...state, ...action.payload}
    case FETCH_SITE_INFO:
        return {...state, ...action.payload}
    default:
      return state;
  }
}