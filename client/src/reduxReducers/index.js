import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducers'
import localCartReducer from './localCartReducers';
import redirectReducers from './redirectReducers';
import siteInfoReducer from './siteInfoReducer';

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    localCart: localCartReducer,
    redirect: redirectReducers,
    siteInfo: siteInfoReducer
});

export default rootReducer;