import axios from 'axios';
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
    CLEAR_GET_PRODUCT_BY_ID,
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

export async function getProductById(productId) {
    const product = await axios.get(`/api/product/${productId}`)
                    
    return {
        type: GET_PRODUCT_BY_ID,
        payload: product.data
    }
}

export async function clearGetProductById() {
    return {
        type: CLEAR_GET_PRODUCT_BY_ID,
        payload: {success: false, productData: {}}
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

export async function clearAddedProduct(dataToSubmit) {
    
    return {
        type: CLEAR_ADDED_PRODUCT,
        payload: {}
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

export async function addBrand(dataToSubmit,existingBrand=[]) {

    const request = await axios.post('/api/brand',dataToSubmit)
                    .then(response => response.data)
                    .catch(error => console.log(error));

    let newBrandList = [...existingBrand,request.brandData]

    return {
        type: ADD_BRAND,
        payload: {
            success: true,
            brandData: newBrandList
        }
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

export async function addWood(dataToSubmit,existingWood=[]) {

    const request = await axios.post('/api/wood',dataToSubmit)
                    .then(response => response.data)
                    .catch(error => console.log(error));

    let newWoodList = [...existingWood,request.woodData]
    
    return {
        type: ADD_WOOD,
        payload: {
            success: true,
            woodData:newWoodList
        }
    }
}