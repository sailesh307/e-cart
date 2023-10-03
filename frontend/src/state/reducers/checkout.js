import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, RESET_ORDER, SET_ADDRESS, SET_PAYMENT, SET_PRODUCTS } from "../actions/checkout";

const initialState = {
    address: null,
    payment: {
        paymentMethod: 'cod',
        paymentDetails: {},
    },
    products: [],
    isPlacingOrder: false,
    isOrderPlaced: false,
    error: null,
};

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case SET_PAYMENT:
            return {
                ...state,
                payment: action.payload,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case PLACE_ORDER_REQUEST:
            return {
                ...state,
                isPlacingOrder: true,
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                isPlacingOrder: false,
                isOrderPlaced: true,
            };
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                isPlacingOrder: false,
                error: action.payload,
            };
        case RESET_ORDER:
            return initialState;
        default:
            return state;
    }
}

export default checkoutReducer;