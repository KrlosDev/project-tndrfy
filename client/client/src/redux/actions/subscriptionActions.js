import {
    LOADING_GET_USER_SUBSCRIPTION,
    SUCCESS_GET_USER_SUBSCRIPTION,
    FAILURE_GET_USER_SUBSCRIPTION
} from "../constants/subscriptionConstants";

export const getUserSubscription = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_USER_SUBSCRIPTION });
    try {
        const res = await fetch("http://localhost:5000/api/users/subscription", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const subscription = await res.json();
        dispatch({ type: SUCCESS_GET_USER_SUBSCRIPTION, payload: subscription });
    } catch (err) {
        dispatch({ type: FAILURE_GET_USER_SUBSCRIPTION, payload: err });
    }
}