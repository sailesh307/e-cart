// src/state/reducers/searchReducer.js

import {
    SET_SEARCH_QUERY,
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE,
} from '../actions/searchActions';

const initialState = {
    query: '',
    results: [],
    isLoading: false,
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        case FETCH_SEARCH_RESULTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.payload,
                isLoading: false,
            };
        case FETCH_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
