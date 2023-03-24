import {
    SUCCESS_GET_USER_INFO,
    LOADING_GET_USER_INFO,
    FAILURE_GET_USER_INFO,
} from '../constants/userConstants';

const initialState = {}

const getUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GET_USER_INFO:
            return { ...state, ...action.payload, }
        case LOADING_GET_USER_INFO:
            return { ...state, loadingUserInfo: true, }
        case FAILURE_GET_USER_INFO:
            return { ...state, loadingUserInfo: false, ...action.payload }
        case 'RESET':
            return initialState
        default:
            return state;
    }
}
export {
    getUserInfoReducer,
}