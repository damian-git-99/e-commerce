import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userUpdateProfileReducer
} from './reducers/userReducers';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducer = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
});

// loading data from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// todo: check if userInfo is still valid, if not, clear it from local storage

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
