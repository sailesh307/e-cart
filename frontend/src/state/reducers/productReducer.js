import {
    PRODUCT_DETAIL_FAILURE,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    SET_PAGINATION,
    SET_SEARCH_QUERY,
    SET_SORT_OPTION,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS,
    RESET_UPDATE_PRODUCT,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_SUCCESS,
    RESET_CREATE_PRODUCT,

    FETCH_SELLER_PRODUCTS_REQUEST,
    FETCH_SELLER_PRODUCTS_SUCCESS,
    FETCH_SELLER_PRODUCTS_FAILURE,
} from "../actions/productActions";

const initialProductsState = {
    products: [],
    loading: false,
    error: null,
    sortOption: null,
    query: "",
    page: 1,
    totalPages: 1,
};

export const productsReducer = (state = initialProductsState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, products: [], loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        //// FETCH A PRODUCT ///////////////////////
        case PRODUCT_DETAIL_REQUEST:
            return { ...state, singleProductLoading: true };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                singleProductLoading: false,
                selectedProduct: action.payload,
            };
        case PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                singleProductLoading: false,
                singleProductError: action.payload,
            };
        ////////////////////////////////////////////
        case SET_SORT_OPTION:
            return { ...state, sortOption: action.payload, page: 1 };
        case SET_SEARCH_QUERY:
            return { ...state, query: action.payload, page: 1 };
        case SET_PAGINATION:
            return { ...state, page: action.payload };
        default:
            return state;
    }
};
const initialProductDetailState = {
    product: null,
    loading: false,
    error: null,
};
export const productDetailReducer = (
    state = initialProductDetailState,
    action
) => {
    switch (action.type) {
        // product detail
        case PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_DETAIL_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case PRODUCT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// create product reducer
const initialCreateProductState = {
    loading: false,
    error: null,
    success: false,
};

export const createProductReducer = (
    state = initialCreateProductState,
    action
) => {
    switch (action.type) {
        case RESET_CREATE_PRODUCT:
            return { ...initialCreateProductState };
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, success: true };
        case CREATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// update product reducer
const initialUpdateProductState = {
    loading: false,
    error: null,
    success: false,
};

export const updateProductReducer = (
    state = initialUpdateProductState,
    action
) => {
    switch (action.type) {
        case RESET_UPDATE_PRODUCT:
            return { ...initialUpdateProductState };
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null, success: false };
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, success: true, };
        case UPDATE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// fetch seller products
const initialSellerProductsState = {
    products: [],
    totalPages: 1,
    currentPage: 1,
    totalProducts: 0,
    loading: false,
    error: null,
};

export const sellerProductsReducer = (
    state = initialSellerProductsState,
    action
) => {
    switch (action.type) {
        case FETCH_SELLER_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_SELLER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalProducts: action.payload.totalProducts,
            }
        case FETCH_SELLER_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};