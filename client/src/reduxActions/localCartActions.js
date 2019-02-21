import {
    LOCAL_ADD_CART,
    LOCAL_INIT_CART,
    LOCAL_CART_CLEAR,
    LOCAL_FETCH_CART,
    LOCAL_REMOVE_CART_ITEM,
} from './types';
import axios from 'axios';
import {manipulateCartData} from '../helper';

export async function addCartLocalStorage(id) {

    var cart = localStorage.getItem('cart')

    if (cart) {

        cart = JSON.parse(cart);

        var cartItem = cart.find((element) => {
            if (element.id === id) {
                return element
            }
            return null;
        })
        
        if (cartItem) {
            
            cart = cart.filter((item) => {return item.id !== id});
            cartItem.quantity += 1;
            cart.push(cartItem)

        } else {
            cartItem = {
                id,
                quantity: 1
            }
            cart.push(cartItem);
        }

    } else {
        cart = []
        cartItem = {
            id,
            quantity: 1
        }
        cart.push(cartItem);
    }

    localStorage.setItem('cart',JSON.stringify(cart));

    return {
        type: LOCAL_ADD_CART,
        payload: cart
    }
}

export async function initCartLocalStorage() {

    var cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = []
    }

    return {
        type: LOCAL_INIT_CART,
        payload: cart
    }
}

export async function clearCartLocalStorage() {

    localStorage.setItem('cart',[]);

    return {
        type: LOCAL_CART_CLEAR,
        payload: []
    }
}

export async function removeCartItem(newCart) {
    localStorage.setItem('cart',JSON.stringify(newCart));
    return {
        type: LOCAL_REMOVE_CART_ITEM,
        payload: newCart
    }
}

// the return type of this is different
export async function fetchProductCart(cartItems) {
    try {
        let cartArray = [];

        if(cartItems.length > 0) {

            cartItems.forEach(item => {
                cartArray.push(item.id);
            })

            const request = await axios.get(`/api/products/query?id=${cartArray.toString()}&type=array`);

            const productData = manipulateCartData(cartItems,request.data.productData)

            return {
                type: LOCAL_FETCH_CART,
                payload: {
                    success: true,
                    productData: productData
                }
            }

        } else {
            return {
                type: LOCAL_FETCH_CART,
                payload: {
                    success: true,
                    productData: []
                }
            }
        }

    }
    catch(error) {
        return {
            type: LOCAL_FETCH_CART,
            payload: {
                success: true,
                productData: [],
                error
            }
        }
    }
    
}