const API_BASE_URL = "http://localhost:5000"; // Change this to your API base URL

export const API_URLS = {
    SIGNUP: `${API_BASE_URL}/api/users/register`,
    LOGIN: `${API_BASE_URL}/api/users/login`,
    SEARCH: `${API_BASE_URL}/api/products/search`,
    PRODUCTS: `${API_BASE_URL}/api/products`,
    FETCH_A_PRODUCT: (productId) => `${API_BASE_URL}/api/products/id/${productId}`,
    CART: `${API_BASE_URL}/api/cart`,
    
    
    
    FETCH_NOTES: `${API_BASE_URL}/api/notes/fetchallnotes`,
    ADD_NOTE: `${API_BASE_URL}/api/notes/addnote`,
    DELETE_NOTE: (noteId) => `${API_BASE_URL}/api/notes/deletenote/${noteId}`,
    UPDATE_NOTE: (noteId) => `${API_BASE_URL}/api/notes/updatenote/${noteId}`,
};

export default API_URLS;