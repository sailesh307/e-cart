const routeNames = {
    HOME: '/',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    ACCOUNT: '/account',
    CART: '/cart',
    SEARCH: '/search',
    PRODUCTPAGE: '/productpage',
    PRODUCT_OVERVIEW: '/product',
    // PRODUCT_OVERVIEW: '/product?pid=:pid&name=:name&vid=:vid',
    CHECKOUT: '/checkout',
    PAYMENT_PAGE: '/paymentpage',
    ORDERS: '/orders',

    // admin 
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_USERS: '/admin/users',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_NEW_PRODUCT: '/admin/new_product',
    ADMIN_UPDATE_PRODUCT: (pid) => `/admin/update_product/${pid}`,
};

export default routeNames;