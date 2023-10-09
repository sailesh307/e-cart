import API_URLS from '../../constants/apiUrls';
import { Axios } from '../../Axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const PRODUCT_DETAIL_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS';
export const PRODUCT_DETAIL_FAILURE = 'PRODUCT_DETAIL_FAILURE';

export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_PAGINATION = 'SET_PAGINATION';

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

///////////// FETCH PRODUCT DETAILS///////////////////////
export const productDetailRequest = () => ({
    type: PRODUCT_DETAIL_REQUEST,
});

export const productDetailSuccess = (data) => ({
    type: PRODUCT_DETAIL_SUCCESS,
    payload: data,
});

export const productDetailFailure = (error) => ({
    type: PRODUCT_DETAIL_FAILURE,
    payload: error,
});
/////////////////////////////////////////////////////
export const setSortOption = (option) => ({
    type: SET_SORT_OPTION,
    payload: option,
});

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});

export const setPagination = (page) => ({
    type: SET_PAGINATION,
    payload: page,
});

// fetch products on search and page change
export const fetchProducts = (page = 1) => {
    return async (dispatch, getState) => {
        const state = getState();
        const { sortOption, query } = state.allProducts;

        const sortOptionString = sortOption ? `&sort=${sortOption}` : '';
        // make sure the query is a string value
        const queryString = query ? `&query=${query}` : '';
        // make sure the page is a number value
        const pageString = page ? `&page=${page}` : '';

        dispatch(fetchProductsRequest());
        try {
            const url = `${API_URLS.PRODUCTS}?${queryString}${sortOptionString}${pageString}`;
            const response = await Axios.get(url);
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(fetchProductsFailure(error.message));
        }
    };
};


// Async action to fetch a product details
export const fetchProductDetails = (productId) => {
    return async (dispatch) => {
        dispatch(productDetailRequest());
        try {
            const response = await Axios.get(API_URLS.FETCH_A_PRODUCT(productId)); // Replace with your API endpoint
            dispatch(productDetailSuccess(response.data));
        } catch (error) {
            if (error.response) {
                dispatch(productDetailFailure(error.response.data.message));
            }
            else if (error.request) {
                dispatch(productDetailFailure(error.request));
            }
            else {
                dispatch(productDetailFailure(error.message));
            }
        }
    };
};

//////////////// Create Product ///////////////////////
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const RESET_CREATE_PRODUCT = 'RESET_CREATE_PRODUCT';

export const resetCreateProductState = () => ({
    type: RESET_CREATE_PRODUCT,
});

export const createProductRequest = () => ({
    type: CREATE_PRODUCT_REQUEST,
});

export const createProductSuccess = (data) => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload: data,
});

export const createProductFailure = (error) => ({
    type: CREATE_PRODUCT_FAILURE,
    payload: error,
});

export const createProduct = (product) => {
    return async (dispatch) => {
        dispatch(createProductRequest());
        try {
            const response = await Axios.post(API_URLS.PRODUCTS, product, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            }
            );
            dispatch(createProductSuccess(response.data));
        } catch (error) {
            if (error.response) {
                dispatch(createProductFailure(error.response.data.message));
            }
            else if (error.request) {
                dispatch(createProductFailure(error.request));
            }
            else {
                dispatch(createProductFailure(error.message));
            }
            console.log(error);
        }
    };
};

//////////////// Update Product ///////////////////////

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const RESET_UPDATE_PRODUCT = 'RESET_UPDATE_PRODUCT';

export const resetUpdateProductState = () => ({
    type: RESET_UPDATE_PRODUCT,
});

const updateProductRequest = () => ({
    type: UPDATE_PRODUCT_REQUEST,
});

const updateProductSuccess = (data) => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: data,
});

const updateProductFailure = (error) => ({
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
});


export const updateProduct = (productId, updatedProductData) => {
    return async (dispatch) => {
        dispatch(updateProductRequest());
        try {
            const response = await Axios.put(API_URLS.UPDATE_PRODUCT(productId), updatedProductData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            }
            );
            dispatch(updateProductSuccess(response.data));
        } catch (error) {
            if (error.response) {
                dispatch(updateProductFailure(error.response.data.message));
            }
            else if (error.request) {
                dispatch(updateProductFailure(error.request));
            }
            else {
                dispatch(updateProductFailure(error.message));
            }
            console.log(error);
        }
    };
}


/////////////// GET ALL PRODUCTS Of SELLER ///////////////////////
export const FETCH_SELLER_PRODUCTS_REQUEST = 'FETCH_SELLER_PRODUCTS_REQUEST';
export const FETCH_SELLER_PRODUCTS_SUCCESS = 'FETCH_SELLER_PRODUCTS_SUCCESS';
export const FETCH_SELLER_PRODUCTS_FAILURE = 'FETCH_SELLER_PRODUCTS_FAILURE';

export const fetchSellerProductsRequest = () => ({
    type: FETCH_SELLER_PRODUCTS_REQUEST,
});

export const fetchSellerProductsSuccess = (data) => ({
    type: FETCH_SELLER_PRODUCTS_SUCCESS,
    payload: data,
});

export const fetchSellerProductsFailure = (error) => ({
    type: FETCH_SELLER_PRODUCTS_FAILURE,
    payload: error,
});

// Async action to fetch all products
export const fetchSellerProducts = (page = 1) => {
    return async (dispatch) => {
        const name = '';
        let queryString = '';
        if(name){
            queryString = `?name=${name}&page=${page}`;
        }
        else{
            queryString = `?page=${page}`;
        }
        dispatch(fetchSellerProductsRequest());

        try {
            const url = `${API_URLS.SELLER_PRODUCTS}${queryString}`;
            const response = await Axios.get(url, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            dispatch(fetchSellerProductsSuccess(response.data));
        } catch (error) {
            if(error.response){
                dispatch(fetchSellerProductsFailure(error.response.data.message));
            }
            else if(error.request){
                dispatch(fetchSellerProductsFailure(error.request));
            }
            else{
                dispatch(fetchSellerProductsFailure(error.message));
            }
            console.log(error);
        }
        
    };
};