import { Axios } from "../../Axios";
import API_URLS from "../../constants/apiUrls";

export const ADMIN_ORDERS_REQUEST = 'ADMIN_ORDERS_REQUEST';
export const ADMIN_ORDERS_SUCCESS = 'ADMIN_ORDERS_SUCCESS';
export const ADMIN_ORDERS_FAIL = 'ADMIN_ORDERS_FAIL';



//// admin orders list 
export const adminGetOrders = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ADMIN_ORDERS_REQUEST });

            const response = await Axios.get(API_URLS.ALL_ORDERS);
            const { orders } = response.data;

            dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: orders });

        } catch (error) {
            dispatch({ type: ADMIN_ORDERS_FAIL, payload: error.message });
        }
    }
}