import axios from 'axios';
import {
    LOGIN_USER,
} from './types';
export function loginUser(dataToSubmit){
    const request = axios.post(`/api/user/login`,dataToSubmit)
                .then(response => response.data)
                .catch(error => console.log(error));

    return {
        type: LOGIN_USER,
        payload: request
    }
}