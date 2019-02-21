import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    SERVER_ADD_CART_ERROR,
    SERVER_ADD_CART,
    SERVER_REMOVE_CART,
    USER_PURCHASE_ITEM,
    UPDATE_PROFILE
} from './types';

// import {clearCartLocalStorage} from './localCartActions';

function generateCart() {

    var cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }
    
    localStorage.setItem('cart',JSON.stringify([]));
    // await clearCartLocalStorage();

    return cart;
}
export function loginUser(dataToSubmit){

    const cart = generateCart();

    var modifiedDataToSubmit = {...dataToSubmit};
    modifiedDataToSubmit['cart'] = cart;

    const request = axios.post(`/api/user/login`,modifiedDataToSubmit)
                .then(response => response.data)
                .catch(error => console.log(error));

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/user/register',dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){

    const request = axios.get('/api/user/auth')
    .then(response => response.data);
    

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get('/api/user/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export async function addToCart(user,id) {

    var dataToSubmit = {
        ...user,
        cartItem: [
            {
                id: id,
                quantity: 1
            }
        ]
    }
    // console.log("save cart back to server",user);
    try {
        const request = await axios.post('/api/users/addToCart',dataToSubmit);
        return {
            type: SERVER_ADD_CART,
            payload: request.data,
        }
    } catch(error) {
        return {
            type: SERVER_ADD_CART_ERROR,
            payload: {}
        }
    }

}

export async function removeFromCart(id, user) {

    const newCart = user.cart.filter((item) => item.id !== id);

    const submitData = {
        cart: newCart,
        userId: user._id
    }

    const request = await axios.post('/api/users/removeFromCart',submitData);

    return {
        type: SERVER_REMOVE_CART,
        payload: request.data
    }
}

export async function purchaseSuccess(submitData) {

    const request = await axios.post('/api/users/purchaseItem',submitData);

    console.log(request.data,"after purchaseItem post route");
    
    return {
        type: USER_PURCHASE_ITEM,
        payload: request.data
    }
}

export async function updateUserProfile(submitData) {
    const request = await axios.post('/api/users/updateProfile',submitData);

    return {
        type: UPDATE_PROFILE,
        payload: request.data
    }
}   