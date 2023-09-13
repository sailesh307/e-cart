// src/state/actions/searchActions.js

import axios from "axios";
import API_URLS from "../../constants/apiUrls";
import { setError, setLoading, setMessage } from "./actions";

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const FETCH_SEARCH_RESULTS_REQUEST = 'FETCH_SEARCH_RESULTS_REQUEST';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILURE = 'FETCH_SEARCH_RESULTS_FAILURE';

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});

export const fetchSearchResultsRequest = () => ({
    type: FETCH_SEARCH_RESULTS_REQUEST,
});

export const fetchSearchResultsSuccess = (results) => ({
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload: results,
});

export const fetchSearchResultsFailure = (error) => ({
    type: FETCH_SEARCH_RESULTS_FAILURE,
    payload: error,
});

// Async action to fetch search results
export const fetchSearchResults = (props) => {
    const { query, limit, page, price } = props;
    // make sure the query is a string value
    const queryString = query ? `&query=${query}` : '';
    // make sure the limit is a number value
    const limitString = limit ? `&limit=${limit}` : '';
    // make sure the page is a number value
    const pageString = page ? `&page=${page}` : '';
    // make sure the price is a number value
    const priceString = price ? `&price=${price}` : '';

    const url = `${API_URLS.SEARCH}?${queryString}${limitString}${pageString}${priceString}`;
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(fetchSearchResultsRequest());
            const response = await axios.get(url);
            
            const results = response.data;
            dispatch(fetchSearchResultsSuccess(results));
            console.log(results);
        } catch (error) {
            dispatch(setError(error.message));
        }
        finally {
            dispatch(setLoading(false));
        }
    };
};