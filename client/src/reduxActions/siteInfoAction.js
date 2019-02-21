import { EDIT_SITE_INFO, FETCH_SITE_INFO } from "./types";
import axios from 'axios';

export async function editInfo(submitData) {

    const request = await axios.post('/api/siteinfo',submitData);

    return {
        type: EDIT_SITE_INFO,
        payload: request.data
    }
}

export async function fetchInfo() {

    const request = await axios.get('/api/siteinfo');

    return {
        type: FETCH_SITE_INFO,
        payload: request.data
    }
}