import axios from 'axios';
import { ORDER_TYPES } from '../reducers/orderReducers';

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
