// reducer.js
import { SET_ERROR, SET_MESSAGE, SET_LOADING } from '../actions/actions';   

const initialState = {
    error: null,
    message: null,
    loading: false,
};

export const errorReducer = (state = initialState.error, action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.payload;
        default:
            return state;
    }
};

export const messageReducer = (state = initialState.message, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};

export const loadingReducer = (state = initialState.loading, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};