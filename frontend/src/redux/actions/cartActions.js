import axios from 'axios';
import { CART_TYPES } from '../reducers/cartReducers';

const URL = 'http://localhost:5000/api/products';

export const addToCart = (id, quantity) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`${URL}/${id}`);
    dispatch({
      type: CART_TYPES.CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity
      }
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_TYPES.CART_REMOVE_ITEM,
      payload: id
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return async (dispatch) => {
    dispatch({
      type: CART_TYPES.CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return async (dispatch) => {
    dispatch({
      type: CART_TYPES.CART_SAVE_PAYMENT_METHOD,
      payload: data
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };
};
