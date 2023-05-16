import axios from 'axios';
import {
  ORDER_PAY_TYPES,
  ORDER_TYPES
} from '../reducers/orderReducers';

const URL = 'http://localhost:5000/api/orders';

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_TYPES.ORDER_CREATE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(URL, order, config);

      dispatch({
        type: ORDER_TYPES.ORDER_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_TYPES.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_TYPES.ORDER_PAY_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${URL}/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_TYPES.ORDER_PAY_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_TYPES.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
