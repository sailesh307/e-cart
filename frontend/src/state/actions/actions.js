export const SET_ERROR = 'SET_ERROR';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_LOADING = 'SET_LOADING';

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
});