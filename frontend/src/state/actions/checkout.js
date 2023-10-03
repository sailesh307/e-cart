import { Axios } from "../../Axios";
import API_URLS from "../../constants/apiUrls";

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAIL = 'PLACE_ORDER_FAIL';
export const RESET_ORDER = 'RESET_ORDER';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_PAYMENT = 'SET_PAYMENT';

export const setDeliveryAddress = (address) => {
    return {
        type: SET_ADDRESS,
        payload: address,
    };
}

export const setPayment = (payment) => {
    return {
        type: SET_PAYMENT,
        payload: payment,
    };
}

export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        payload: products,
    };
}



export const placeOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PLACE_ORDER_REQUEST });
        const { checkout } = getState();
        const { address, payment, products } = checkout;
        const order = {
            orderItems: products,
            shippingAddressId: address._id,
            paymentMethod: payment.paymentMethod,
            paymentDetails: payment.paymentDetails,
        }

        const response = await Axios.post(API_URLS.PLACE_ORDER, order, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });

        const { _id: orderId } = response.data;

        dispatch({ type: PLACE_ORDER_SUCCESS });
        dispatch({ type: RESET_ORDER });

        return orderId;

    } catch (error) {
        dispatch({ type: PLACE_ORDER_FAIL, payload: error.message });
    }
}