import axios from 'axios';
import {
  ORDER_DETAILS_TYPES,
  ORDER_LIST_TYPES,
  ORDER_PAY_TYPES,
  ORDER_TYPES
} from '../reducers/orderReducers';

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

      const { data } = await axios.post('/api/orders', order, config);

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

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_TYPES.ORDER_DETAILS_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      console.log(data);
      dispatch({
        type: ORDER_DETAILS_TYPES.ORDER_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_DETAILS_TYPES.ORDER_DETAILS_FAIL,
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
        `/api/orders/${orderId}/pay`,
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

export const listMyOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_TYPES.ORDER_LIST_MY_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get('/api/orders/myorders', config);

      dispatch({
        type: ORDER_LIST_TYPES.ORDER_LIST_MY_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_TYPES.ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
