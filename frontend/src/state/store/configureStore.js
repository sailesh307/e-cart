// configureStore.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import cartReducer from '../reducers/cartReducer';
import searchReducer from '../reducers/searchReducer';
import { errorReducer, messageReducer, loadingReducer } from '../reducers/reducer';
import productReducer from '../reducers/productReducer';


// Combine reducers
const rootReducer = combineReducers({
    error: errorReducer,
    message: messageReducer,
    loading: loadingReducer,

    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
    products: productReducer,
    // ...other reducers
});

// Create and configure the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
