export const API_URLS = {
    SIGNUP: '/api/users/register',
    LOGIN: '/api/users/login',
    PRODUCTS: '/api/products',
    FETCH_A_PRODUCT: (productId) => `/api/products/id/${productId}`,
    CART: '/api/cart',
    ADMIN_GET_USERS: '/api/users/all',

    // orders
    ALL_ORDERS: '/api/orders',

    // address routes
    ADDRESS: '/api/address',

    // checkout
    PLACE_ORDER: '/api/orders',

    // product
    SELLER_PRODUCTS: '/api/products/seller',
    CREATE_PRODUCT: '/api/products',
    UPDATE_PRODUCT: (productId) => `/api/products/id/${productId}`,
    DELETE_PRODUCT: (productId) => `/api/products/id/${productId}`,
    
};

export default API_URLS;