
import {
    LOADING_GET_SUBSCRIPTION_TYPES,
    SUCCESS_GET_SUBSCRIPTION_TYPES,
    FAILURE_GET_SUBSCRIPTION_TYPES
} from '../constants/subscriptionTypeConstants'
const INITIAL_STATE = {}

const getSubscriptionTypeReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOADING_GET_SUBSCRIPTION_TYPES:
            return { ...state, ...action.payload, loadingSubscriptionTypes: true }
        case SUCCESS_GET_SUBSCRIPTION_TYPES:
            return { ...state, ...action.payload, loadingSubscriptionTypes: false }
        case FAILURE_GET_SUBSCRIPTION_TYPES:
            return { ...state, ...action.payload, loadingSubscriptionTypes: false }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}
export { getSubscriptionTypeReducer }