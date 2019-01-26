// contain initial and dispatch {type: action}
import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_BY_FILTER,
    ADD_PRODUCT
} from '../reduxActions/types';

const initialState = {
    success: false, 
    bySell:[], 
    byArrival:[], 
    woods: {
        success: false, woodData:[]
    }, 
    brands: {
        success: false, brandData:[]
    }, 
    allProducts:[],
    filterProduct: {
        success: false, 
        size: 0,
        products: []
    }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_ARRIVAL:
        return { ...state, success: true, byArrival: action.payload.products}
    case GET_PRODUCT_BY_SELL:
        return {...state, success: true, bySell: action.payload.products}
    case GET_PRODUCT_BY_FILTER:
        const filterProduct = {
            success: action.payload.success,
            size: action.payload.size,
            products: action.payload.products
        }
        return {...state, filterProduct: filterProduct}
    case GET_BRANDS:
        return {...state, success: true, brands: action.payload}
    case GET_WOODS:
        return {...state, success: true, woods: action.payload}
    case ADD_PRODUCT:
        const addProduct = {
            success: action.payload.success, 
            newProduct: action.payload.productData
        }
        return {...state, addProduct: addProduct}
    default:
      return state;
  }
}