// src/state/reducers/cartReducer.js
import { ADD_TO_CART, CART_FAILURE, CART_REQUEST, CHANGE_QUANTITY, INITIALIZE_CART, REMOVE_FROM_CART } from '../actions/cartActions';

/* 
    const items = {
        "_id": cartItemId
        sellerId: product.sellerId,
        category: product.category,
        name: product.name,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        shippingFee: product.shippingFee,
        images: product.images,
        rating: product.rating,
        ratingCount: product.ratingCount,
        productId: product._id,
    };
*/

const initialState = {
    items: null,
    subTotal: 0,
    shippingFee: 0,
    itemCount: 0,
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case INITIALIZE_CART: {
            return {
                ...state,
                items: action.payload,
                subTotal: action.payload.reduce((subTotal, item) => subTotal + item.price.selling * item.quantity, 0),
                shippingFee: action.payload.reduce((shippingFee, item) => shippingFee + item.shippingFee * item.quantity, 0),
                itemCount: action.payload.reduce((subTotal, item) => subTotal + item.quantity, 0),
                loading: false,
            };
        }
        case ADD_TO_CART: {
            const newItem = action.payload;
            newItem.quantity = 1;
            return {
                ...state,
                items: [...state.items, newItem],
                subTotal: state.subTotal + newItem.price.selling,
                shippingFee: state.shippingFee + newItem.shippingFee,
                itemCount: state.itemCount + 1,
                loading: false,
            };
        }
        case REMOVE_FROM_CART: {
            const itemId = action.payload;
            const itemToRemove = state.items.find((item) => item._id === itemId);
            if (itemToRemove) {
                // remove the item from the cart
                const updatedItems = state.items.filter((item) => {
                    return item._id !== itemId;
                });

                return {
                    ...state,
                    items: updatedItems,
                    subTotal: state.subTotal - itemToRemove.price.selling * itemToRemove.quantity,
                    shippingFee: state.shippingFee - itemToRemove.shippingFee * itemToRemove.quantity,
                    itemCount: state.itemCount - itemToRemove.quantity,
                    loading: false,
                };
            }
        }
            break;
        case CHANGE_QUANTITY: {
            const { itemId, quantity } = action.payload;
            const itemToChange = state.items.find((item) => item._id === itemId);
            const quantityDifference = quantity - itemToChange.quantity;

            if (itemToChange) {
                // change the quantity of the item in the cart
                itemToChange.quantity = quantity;
                return {
                    ...state,
                    subTotal: state.subTotal + itemToChange.price.selling * quantityDifference,
                    shippingFee: state.shippingFee + itemToChange.shippingFee * quantityDifference,
                    itemCount: state.itemCount + quantityDifference,
                    loading: false,
                };
            }
        }
            break;
        case CART_FAILURE: {
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        }

        default:
            return state;
    }
};

export default cartReducer;
