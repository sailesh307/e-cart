import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT_SUCCESS, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actions/userActions';

const initialUserState = {
    loading: false,
    error: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null, 
};

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
            };
        case AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};