import {
    LOADING_GET_SUBSCRIPTION_TYPES,
    SUCCESS_GET_SUBSCRIPTION_TYPES,
    FAILURE_GET_SUBSCRIPTION_TYPES
} from "../constants/subscriptionTypeConstants";

export const getSubscriptionTypes = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_SUBSCRIPTION_TYPES });
    try {
        const res = await fetch("http://localhost:5000/api/subscription-types", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const subscriptionTypes = await res.json();
        dispatch({ type: SUCCESS_GET_SUBSCRIPTION_TYPES, payload: subscriptionTypes });
    } catch (err) {
        dispatch({ type: FAILURE_GET_SUBSCRIPTION_TYPES, payload: err });
    }
}