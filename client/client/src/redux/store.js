import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    getSongsReducer, getNextRandomSongReducer,
    songPlayerDataReducer, songPlayerReducer
} from "./reducers/songReducers";
import { getSubscriptionTypeReducer } from "./reducers/subscriptionTypeReducers";
import { getUserSubscriptionReducer } from "./reducers/subscriptionReducers";
import { getUserInfoReducer } from "./reducers/userReducers";

const reducers = combineReducers({
    songs: getSongsReducer,
    song: getNextRandomSongReducer,

    songPlayer: songPlayerReducer,
    songPlayerData: songPlayerDataReducer,

    subscriptionTypes: getSubscriptionTypeReducer,
    subscription: getUserSubscriptionReducer,
    userInfo: getUserInfoReducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
