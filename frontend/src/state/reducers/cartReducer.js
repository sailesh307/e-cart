// src/state/reducers/cartReducer.js
import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_FROM_CART } from '../actions/cartActions';

const data = [
    {
        id: 1,
        variantId: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: 90,
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        variantId: 1,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: 32,
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },

];

const initialState = {
    items: data,
    total: data.reduce((total, item) => total + item.price * item.quantity, 0),
    itemCount: data.reduce((total, item) => total + item.quantity, 0)
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            newItem.quantity = 1;
            return {
                ...state,
                items: [...state.items, newItem],
                total: state.total + newItem.price,
                itemCount: state.itemCount + 1,
            };

        case REMOVE_FROM_CART:
            const product = action.payload;
            const itemToRemove = state.items.find((item) => {
                return item.id === product.productId && item.variantId === product.variantId;
            });
            if (itemToRemove) {
                // remove the item from the cart
                const updatedItems = state.items.filter((item) => {
                    return !(item.id === product.productId && item.variantId === product.variantId);
                });

                return {
                    ...state,
                    items: updatedItems,
                    total: state.total - itemToRemove.price * itemToRemove.quantity,
                    itemCount: state.itemCount - itemToRemove.quantity,
                };
            }
            break;
        case CHANGE_QUANTITY:
            const { productId, variantId, quantity } = action.payload;
            const itemToChange = state.items.find((item) => item.id === productId && item.variantId === variantId);
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
            break;

        default:
            return state;
    }
};

export default cartReducer;
