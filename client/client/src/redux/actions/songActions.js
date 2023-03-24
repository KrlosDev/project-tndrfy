import {
    LOADING_GET_SONGS,
    SUCCESS_GET_SONGS,
    FAILURE_GET_SONGS,

    LOADING_GET_NEXT_RANDOM_SONG,
    SUCCESS_GET_NEXT_RANDOM_SONG,
    FAILURE_GET_NEXT_RANDOM_SONG
} from "../constants/songConstants";

export const getSongs = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_SONGS });
    try {
        const res = await fetch("http://localhost:5000/api/songs", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const songs = await res.json();
        dispatch({ type: SUCCESS_GET_SONGS, payload: songs });
    } catch (err) {
        dispatch({ type: FAILURE_GET_SONGS, payload: err });
    }
}
export const getNextRandomSong = (token) => async dispatch => {
    dispatch({ type: LOADING_GET_NEXT_RANDOM_SONG });
    try {
        const res = await fetch(`http://localhost:5000/api/songs/nextRandom`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const song = await res.json()
        dispatch({ type: SUCCESS_GET_NEXT_RANDOM_SONG, payload: song })
    } catch (e) {
        console.log(e)
        dispatch({ type: FAILURE_GET_NEXT_RANDOM_SONG, payload: e });
        return null
    }
}