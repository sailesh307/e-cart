import axios from 'axios';
import API_URLS from '../../constants/apiUrls';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_A_PRODUCT_REQUEST = 'FETCH_A_PRODUCT_REQUEST';
export const FETCH_A_PRODUCT_SUCCESS = 'FETCH_A_PRODUCT_SUCCESS';
export const FETCH_A_PRODUCT_FAILURE = 'FETCH_A_PRODUCT_FAILURE';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (data) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

///////////// FETCH A PRODUCT ///////////////////////
export const fetchAProductRequest = () => ({
    type: FETCH_A_PRODUCT_REQUEST,
});

export const fetchAProductSuccess = (data) => ({
    type: FETCH_A_PRODUCT_SUCCESS,
    payload: data,
});

export const fetchAProductFailure = (error) => ({
    type: FETCH_A_PRODUCT_FAILURE,
    payload: error,
});
/////////////////////////////////////////////////////
export const setSortOption = (option) => ({
    type: SET_SORT_OPTION,
    payload: option,
});

// Async action to fetch all products
export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const { sortOption } = state.products;

        dispatch(fetchProductsRequest());
        try {
            const query = sortOption ? `?sort=${sortOption}` : '';
            const url = API_URLS.PRODUCTS + query;
            console.log('url', url);
            const response = await axios.get(url);
            dispatch(fetchProductsSuccess(response.data));
            console.log('data', response.data);
        } catch (error) {
            console.log(error);
            dispatch(fetchProductsFailure(error.message));
        }
    };
};


// Async action to fetch a (single) product
export const fetchAProduct = (productId) => {
    return async (dispatch) => {
        dispatch(fetchAProductRequest());
        try {
            const response = await axios.get(API_URLS.FETCH_A_PRODUCT(productId)); // Replace with your API endpoint
            console.log('data', response.data);
            dispatch(fetchAProductSuccess(response.data));
        } catch (error) {
            dispatch(fetchAProductFailure(error.message));
        }
    };
};

