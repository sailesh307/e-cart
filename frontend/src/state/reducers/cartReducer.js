// src/state/reducers/cartReducer.js
import { ADD_TO_CART, CHANGE_QUANTITY, INITIALIZE_CART, REMOVE_FROM_CART } from '../actions/cartActions';

// const items = [
//     {
//         "productId": "650147a6395fe358871d0394",
//         "variantId": "650147a6395fe358871d0395",
//         "name": "iPhone 14 Pro(Space Black | 128 GB)",
//         "price": 100999,
//         "color": "Space Black",
//         "quantity": 1,
//         "image": "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/l/p/-original-imaghxemc3wtcuhb.jpeg?q=70",
//         "_id": "650189ba29c4466bcd0dd368"
//     }
// ];

const initialState = {
    items: null,
    total: 0,
    itemCount: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_CART: {
            return {
                ...state,
                items: action.payload,
                total: action.payload.reduce((total, item) => total + item.price * item.quantity, 0),
                itemCount: action.payload.reduce((total, item) => total + item.quantity, 0),
            };
        }
        case ADD_TO_CART: {
            const newItem = action.payload;
            newItem.quantity = 1;
            return {
                ...state,
                items: [...state.items, newItem],
                total: state.total + newItem.price,
                itemCount: state.itemCount + 1,
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
                    total: state.total - itemToRemove.price * itemToRemove.quantity,
                    itemCount: state.itemCount - itemToRemove.quantity,
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
                    total: state.total + itemToChange.price * quantityDifference,
                    itemCount: state.itemCount + quantityDifference,
                };
            }
        }
            break;

        default:
            return state;
    }
};

export default cartReducer;
