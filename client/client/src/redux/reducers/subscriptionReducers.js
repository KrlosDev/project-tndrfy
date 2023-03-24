
import {
    LOADING_GET_USER_SUBSCRIPTION,
    SUCCESS_GET_USER_SUBSCRIPTION,
    FAILURE_GET_USER_SUBSCRIPTION,

} from '../constants/subscriptionConstants'
const INITIAL_STATE = {}

const getUserSubscriptionReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOADING_GET_USER_SUBSCRIPTION:
            return { ...state, ...action.payload, loadingGetUserSubscription: true }
        case SUCCESS_GET_USER_SUBSCRIPTION:
            return { ...state, ...action.payload, loadingGetUserSubscription: false }
        case FAILURE_GET_USER_SUBSCRIPTION:
            return { ...state, ...action.payload, loadingGetUserSubscription: false }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}
export { getUserSubscriptionReducer }