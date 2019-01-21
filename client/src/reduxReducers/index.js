import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducers'

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer
});

export default rootReducer;