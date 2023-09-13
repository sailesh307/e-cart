// src/state/actions/cartActions.js

import axios from "axios";
import API_URLS from "../../constants/apiUrls";

// Action types
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

// fetch the cart from the server with header
export const fetchCart = () => async (dispatch) => {
    if(!localStorage.getItem('token')) return;
    try {
        const response = await axios.get(API_URLS.CART, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        const { items } = response.data;
        console.log('fetched cart', items);
        dispatch(initializeCart(items));
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = (product) => async (dispatch) => {
    if(!localStorage.getItem('token')) return;
    try {
        await axios.post(API_URLS.CART, product, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(addToCart(product));
    } catch (error) {
        console.log(error);
    }
};

export const removeProductFromCart = (itemId) => async (dispatch) => {
    if(!localStorage.getItem('token')) return;
    try {
        await axios.delete(`${API_URLS.CART}/${itemId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(removeFromCart(itemId));
    } catch (error) {
        console.log(error);
    }
};

export const changeProductQuantity = (itemId, quantity) => async (dispatch) => {
    if (!localStorage.getItem('token')) return;
    try {
        await axios.put(`${API_URLS.CART}/${itemId}`, {  quantity }, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(changeQuantity(itemId, quantity));
    } catch (error) {
        console.log(error);
    }
};