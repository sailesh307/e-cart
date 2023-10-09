import API_URLS from '../../constants/apiUrls';
import { setCart } from './cartActions';
import { Axios } from '../../Axios';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const authRequest = () => ({
    type: AUTH_REQUEST,
});

const authSuccess = (user, token) => ({
    type: AUTH_SUCCESS,
    payload: { user, token },
});

const authFailure = (error) => ({
    type: AUTH_FAILURE,
    payload: error,
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

// function to clear the errors in the state
export const clearErrors = () => ({
    type: AUTH_FAILURE,
    payload: null,
});

// Async action to log in a user
export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(authRequest());
            const response = await Axios.post(API_URLS.LOGIN, { email, password });
            const { user, token } = response.data; // Extract the user and token from the response
            // Save the token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSuccess(user, token));
            dispatch(setCart()); // initialize the cart
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                dispatch(authFailure(error.response.data.message));
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                dispatch(authFailure('Server not available. Please try again later.'));
            } else {
                // Something happened in setting up the request that triggered an Error
                dispatch(authFailure(error.message));
            }
            console.error('Login error:', error);
        }
    };
};

// Async action to log out a user
export const logoutUser = () => async (dispatch) => {
    try {
        authRequest();
        // Remove the token and user from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Logged out');
        // move to login page
        
        // Dispatch the success action
        dispatch(setCart());
        dispatch(logoutSuccess());
    } catch (error) {
        // Handle logout error
        dispatch(authFailure(error.message));
        console.error('Logout error:', error);
    }
};

// Async action to sign up a user
export const signupUser = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(authRequest());
            const response = await Axios.post(API_URLS.SIGNUP, formData);
            const { user, token } = response.data; // Extract the user and token from the response
            // Save the token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(authSuccess(user, token))
            dispatch(setCart());
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                dispatch(authFailure(error.response.data.message));
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                dispatch(authFailure('Server not available. Please try again later.'));
            } else {
                // Something happened in setting up the request that triggered an Error
                dispatch(authFailure(error.message));
            }
            console.error('Signup error:', error);
        }
    };
}

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

////// admin 
export const AdminGetUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_USERS_REQUEST,
            });
            const response = await Axios.get(API_URLS.ADMIN_GET_USERS, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });
            const { users } = response.data; // Extract the user and token from the response
            // Dispatch the success action
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: users,
            });
        } catch (error) {
            dispatch({
                type: GET_USERS_FAILURE,
                payload: error.message,
            });
            console.error('users fetch error:', error);
        }
    };
}