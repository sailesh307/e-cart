// src/state/actions/cartActions.js
// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

// Action creators
export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId, variantId) => ({
    type: REMOVE_FROM_CART,
    payload: { productId, variantId},
});

export const changeQuantity = (productId, variantId, quantity) => ({
    type: CHANGE_QUANTITY,
    payload: { productId, variantId, quantity },
});