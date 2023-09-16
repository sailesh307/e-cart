import { FETCH_A_PRODUCT_FAILURE, FETCH_A_PRODUCT_REQUEST, FETCH_A_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, SET_SORT_OPTION } from "../actions/productActions";

const initialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    singleProductLoading: false,
    singleProductError: null,
    sortOption: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        //// FETCH A PRODUCT ///////////////////////
        case FETCH_A_PRODUCT_REQUEST:
            return { ...state, singleProductLoading: true };
        case FETCH_A_PRODUCT_SUCCESS:
            return { ...state, singleProductLoading: false, selectedProduct: action.payload };
        case FETCH_A_PRODUCT_FAILURE:
            return { ...state, singleProductLoading: false, singleProductError: action.payload };
        ////////////////////////////////////////////
        case SET_SORT_OPTION:
            return { ...state, sortOption: action.payload };
        default:
            return state;
    }
};

export default productReducer;