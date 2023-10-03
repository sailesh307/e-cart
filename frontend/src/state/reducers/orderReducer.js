import { ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS } from "../actions/orderActions";


// 
export const adminOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            };
        case ADMIN_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case ADMIN_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}