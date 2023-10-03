import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { allUsersReducer, userReducer } from '../reducers/userReducer';
import cartReducer from '../reducers/cartReducer';
import { errorReducer, messageReducer, loadingReducer } from '../reducers/reducer';
import {createProductReducer, productDetailReducer, productsReducer, sellerProductsReducer, updateProductReducer} from '../reducers/productReducer';
import { adminOrdersReducer } from '../reducers/orderReducer';
import checkoutReducer from '../reducers/checkout';


// Combine reducers
const rootReducer = combineReducers({
    error: errorReducer,
    message: messageReducer,
    loading: loadingReducer,

    user: userReducer,
    allUsers: allUsersReducer,
    
    cart: cartReducer,
    allProducts: productsReducer,
    productDetail: productDetailReducer,
    
    allOrders: adminOrdersReducer,

    checkout: checkoutReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    sellerProducts: sellerProductsReducer,
});

// Create and configure the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
