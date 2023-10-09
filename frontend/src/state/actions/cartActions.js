import API_URLS from "../../constants/apiUrls";
import { Axios } from "../../Axios";

// Action types
export const CART_REQUEST = 'CART_REQUEST';
export const CART_SUCCESS = 'CART_SUCCESS';
export const CART_FAILURE = 'CART_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const INITIALIZE_CART = 'FETCH_CART';

// Action creators
const initializeCart = (cart) => ({
    type: INITIALIZE_CART,
    payload: cart,
});

const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

const removeFromCart = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId,
});

const changeQuantity = (itemId, quantity) => ({
    type: CHANGE_QUANTITY,
    payload: { itemId, quantity },
});

const requestCart = () => ({
    type: CART_REQUEST,
});

const cartFailure = (error) => ({
    type: CART_FAILURE,
    payload: error,
});

export const clearErrors = () => ({
    type: CART_FAILURE,
    payload: null,
});

// fetch the cart from the server with header
export const setCart = () => async (dispatch) => {
    if (!localStorage.getItem('token')) {
        dispatch(initializeCart([]));
        return;
    };
    try {
        dispatch(requestCart());
        const response = await Axios.get(API_URLS.CART, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        const { items } = response.data;
        dispatch(initializeCart(items));
    } catch (error) {
        console.log(error);
        dispatch(cartFailure(error));
    }
}

export const addProductToCart = (productId, variantId) => async (dispatch) => {
    if(!localStorage.getItem('token')) return;
    try {
        dispatch(requestCart());
        const response = await Axios.post(API_URLS.CART, {productId, variantId}, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        const product = response.data;
        dispatch(addToCart(product));
    } catch (error) {
        console.log(error);
        dispatch(cartFailure(error));
    }
};

export const removeProductFromCart = (itemId) => async (dispatch) => {
    if(!localStorage.getItem('token')) return;
    try {
        dispatch(requestCart());
        await Axios.delete(`${API_URLS.CART}/${itemId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(removeFromCart(itemId));
    } catch (error) {
        console.log(error);
        dispatch(cartFailure(error));
    }
};

export const changeProductQuantity = (itemId, quantity) => async (dispatch) => {
    if (!localStorage.getItem('token')) return;
    try {
        dispatch(requestCart());
        await Axios.put(`${API_URLS.CART}/${itemId}`, {  quantity }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(changeQuantity(itemId, quantity));
    } catch (error) {
        console.log(error);
        dispatch(cartFailure(error));
    }
};