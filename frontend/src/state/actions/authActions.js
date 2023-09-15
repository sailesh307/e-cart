// src/state/actions/authActions.js
import axios from 'axios';
import API_URLS from '../../constants/apiUrls';
import { setError, setLoading, setMessage } from './actions';
import { setCart } from './cartActions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginSuccess = (user, token) => ({
    type: LOGIN_SUCCESS,
    payload: { user, token },
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

// Async action to log in a user
export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(API_URLS.LOGIN, { email, password });
            const { user, token } = response.data; // Extract the user and token from the response
            console.log(user, token);
            // Save the token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(setMessage('Logged in successfully'));
            dispatch(loginSuccess(user, token));
            dispatch(setCart());
        } catch (error) {
            dispatch(setError(error.message));
            console.error('Login error:', error);
        }
        finally {
            dispatch(setLoading(false));
        }
    };
};

// Async action to log out a user
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        // Remove the token and user from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Logged out');
        // move to login page
        
        // Dispatch the success action
        dispatch(setMessage('Logged out successfully'));
        dispatch(setCart());
        dispatch(logoutSuccess());
    } catch (error) {
        // Handle logout error
        dispatch(setError(error.message));
        console.error('Logout error:', error);
    }
    finally {
        dispatch(setLoading(false));
    }
};

// Async action to sign up a user
export const signupUser = (username, email, password, role) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(API_URLS.SIGNUP, { username, email, password, role });
            const { user, token } = response.data; // Extract the user and token from the response
            console.log(user, token);
            // Save the token and user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(loginSuccess(user, token));
            dispatch(setMessage('Signed up successfully'));
            console.log('Signed up');
            dispatch(setCart());
        } catch (error) {
            // display response error message
            dispatch(setError(error.message));
            console.error('Signup error:', error);
        }
        finally {
            dispatch(setLoading(false));
        }
    };
}