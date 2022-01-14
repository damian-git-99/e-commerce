import axios from 'axios';
import {
  PRODUCT_DELETE_TYPES,
  PRODUCT_DETAILS_TYPES,
  PRODUCT_TYPES
} from '../reducers/productReducers';

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TYPES.PRODUCT_LIST_REQUEST });
      const { data } = await axios.get('/api/products');
      dispatch({
        type: PRODUCT_TYPES.PRODUCT_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_TYPES.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_TYPES.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: PRODUCT_DETAILS_TYPES.PRODUCT_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_TYPES.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_TYPES.PRODUCT_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: PRODUCT_DELETE_TYPES.PRODUCT_DELETE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_TYPES.PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
