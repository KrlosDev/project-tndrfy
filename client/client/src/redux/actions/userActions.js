import {
    LOADING_GET_USER_INFO,
    SUCCESS_GET_USER_INFO,
    FAILURE_GET_USER_INFO
} from "../constants/userConstants";

export const getUserInfo = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_USER_INFO });
    try {
        const res = await fetch("http://localhost:5000/api/users/self/info", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const userInfo = await res.json();
        dispatch({ type: SUCCESS_GET_USER_INFO, payload: userInfo });
    } catch (err) {
        dispatch({ type: FAILURE_GET_USER_INFO, payload: err });
    }
}