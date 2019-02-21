import { REDIRECT, CLEAR_LINK } from "./types";

export function redirect(link) {
    return {
        type: REDIRECT,
        payload: link
    }
}

export function clearLink() {
    return {
        type: CLEAR_LINK,
        payload: ""
    }
}