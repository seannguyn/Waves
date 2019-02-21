// contain initial and dispatch {type: action}
import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_BY_FILTER,
    ADD_PRODUCT,
    CLEAR_ADDED_PRODUCT,
    ADD_BRAND,
    ADD_WOOD,
    GET_PRODUCT_BY_ID,
    CLEAR_GET_PRODUCT_BY_ID
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
        size: -1,
        products: []
    },
    newProduct: {
        success: false,
        newProduct: {}
    },
    productDetail: {
        success: false,
        productData: {}
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
    case ADD_BRAND:
        return {
            ...state, 
            success: true, 
            brands: action.payload
        };
        
    case GET_WOODS:
        return {...state, success: true, woods: action.payload};

    case ADD_WOOD:
        return {
            ...state, 
            success: true, 
            woods: action.payload
        }

    case ADD_PRODUCT:
        const addProduct = {
            success: action.payload.success, 
            newProduct: action.payload.productData
        }
        return {...state, addProduct: addProduct}

    case CLEAR_ADDED_PRODUCT:
        return {
            ...state, 
            addProduct:{
                success: false,
                newProduct: {}
            }
        }
    
    case GET_PRODUCT_BY_ID:
        return {
            ...state,
            productDetail: action.payload
        }
    
    case CLEAR_GET_PRODUCT_BY_ID:
        return {
            ...state,
            productDetail: action.payload
        }

    default:
      return state;
  }
}