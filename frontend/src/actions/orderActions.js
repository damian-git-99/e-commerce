import axios from 'axios';
import {
  ORDER_DELIVER_TYPES,
  ORDER_DETAILS_TYPES,
  ORDER_LIST_ADMIN_TYPES,
  ORDER_LIST_TYPES,
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

      const { data } = await axios.get(`${URL}/${id}`, config);
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

      const { data } = await axios.get(`${URL}/myorders`, config);

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

export const deliverOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_TYPES.ORDER_DELIVER_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${URL}/${order.id}/deliver`,
        {},
        config
      );

      dispatch({
        type: ORDER_DELIVER_TYPES.ORDER_DELIVER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_TYPES.ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const listOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_ADMIN_TYPES.ORDER_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(URL, config);

      dispatch({
        type: ORDER_LIST_ADMIN_TYPES.ORDER_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_ADMIN_TYPES.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
