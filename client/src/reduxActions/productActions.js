import axios from 'axios';
import {
    GET_PRODUCT_BY_ARRIVAL,
    GET_PRODUCT_BY_SELL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCT_BY_FILTER,
    ADD_PRODUCT,
} from './types';

// BY ARRIVAL
// /otherquery?sortBy=createdAt&order=desc&limit=4
export async function getProductByArrival(){

    const request = await axios.get(`/api/products/otherquery?sortBy=createdAt&order=desc&limit=4`)
                .then(response => response.data)
                .catch(error => console.log(error));
    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
}

// BY SELL
// /otherquery?sortBy=sold&order=desc&limit=100
export async function getProductBySell(){

    const request = await axios.get(`/api/products/otherquery?sortBy=sold&order=desc&limit=100`)
                .then(response => response.data)
                .catch(error => console.log(error));
    return {
        type: GET_PRODUCT_BY_SELL,
        payload: request
    }
}

export async function getProductByFilter({skip, limit, filter}, previousState =[]) {
    
    const data = {
        skip,
        limit,
        filter,
    }

    const request = await axios.post(`/api/products/shop`,data);

    const returnFilterProduct = {
        success: request.data.success,
        size: request.data.size,
        products: previousState.concat(request.data.products)
    }

    return {
        type: GET_PRODUCT_BY_FILTER,
        payload: returnFilterProduct
    }
}

export async function addProduct(dataToSubmit) {
    const request = await axios.post(`/api/product`,dataToSubmit);
    console.log(request,"submit data");
    
    return {
        type: ADD_PRODUCT,
        payload: request.data,
    }
}

///////////////////////////////////////////////
///////////// CATEGORIES //////////////////////
///////////////////////////////////////////////

export async function getBrands() {

    const request = await axios.get('/api/brands')
                    .then(response => response.data)
                    .catch(error => console.log(error));

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export async function getWoods() {

    const request = await axios.get('/api/woods')
                    .then(response => response.data)
                    .catch(error => console.log(error));    

    return {
        type: GET_WOODS,
        payload: request,
    }
}