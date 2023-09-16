// src/state/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null, // Add token property to store the authentication token
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token, // Save the authentication token
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                token: null, // Clear the token on logout
            };

        default:
            return state;
    }
};

export default authReducer;
