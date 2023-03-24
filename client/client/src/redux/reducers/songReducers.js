import {
    LOADING_GET_SONGS,
    SUCCESS_GET_SONGS,
    FAILURE_GET_SONGS,

    LOADING_GET_NEXT_RANDOM_SONG,
    SUCCESS_GET_NEXT_RANDOM_SONG,
    FAILURE_GET_NEXT_RANDOM_SONG,

    LOADING_SONG_DATA,
    SET_SONG_DATA,
    CLEAR_SONG_DATA,

    PLAY_SONG,
    PAUSE_SONG
} from '../constants/songConstants'
const INITIAL_STATE = {}

const getSongsReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOADING_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: true }
        case SUCCESS_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: false }
        case FAILURE_GET_SONGS:
            return { ...state, ...action.payload, loadingGetSongs: false }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}
const INITIAL_STATE_RANDOM = {
    song: null
}
const getNextRandomSongReducer = (state = INITIAL_STATE_RANDOM, action = {}) => {
    switch (action.type) {
        case LOADING_GET_NEXT_RANDOM_SONG:
            return { ...state, ...action.payload, loadingGetNextRandomSong: true }
        case SUCCESS_GET_NEXT_RANDOM_SONG:
            return { ...state, ...action.payload, loadingGetNextRandomSong: false }
        case FAILURE_GET_NEXT_RANDOM_SONG:
            return { ...action.payload, loadingGetNextRandomSong: false }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}
const INITIAL_STATE_SONG_PLAYER_DATA = {
    song: {},
}
const songPlayerDataReducer = (state = INITIAL_STATE_SONG_PLAYER_DATA, action = {}) => {
    switch (action.type) {
        case LOADING_SONG_DATA:
            return { ...state, loadingSongData: true }
        case SET_SONG_DATA:
            return { ...state, song: { ...action.payload }, loadingSongData: false }
        case CLEAR_SONG_DATA:
            return { ...INITIAL_STATE_SONG_PLAYER_DATA, loadingSongData: false }
        case "RESET":
            return INITIAL_STATE_SONG_PLAYER_DATA
        default:
            return state
    }
}
const INITIAL_STATE_SONG_PLAYER = {
    playing: false,
}
const songPlayerReducer = (state = INITIAL_STATE_SONG_PLAYER, action = {}) => {
    switch (action.type) {
        case PLAY_SONG:
            return { ...state, playing: true }
        case PAUSE_SONG:
            return { ...state, playing: false }
        case "RESET":
            return INITIAL_STATE_SONG_PLAYER
        default:
            return state
    }
}



export { getSongsReducer, getNextRandomSongReducer, songPlayerReducer, songPlayerDataReducer }