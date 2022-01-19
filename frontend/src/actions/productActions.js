import axios from 'axios';
import {
  PRODUCT_CREATE_REVIEW,
  PRODUCT_CREATE_TYPES,
  PRODUCT_DELETE_TYPES,
  PRODUCT_DETAILS_TYPES,
  PRODUCT_TYPES,
  PRODUCT_UPDATE_TYPES
} from '../reducers/productReducers';

export const listProducts = (keyword = '') => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TYPES.PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`/api/products?keyword=${keyword}`);
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

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_TYPES.PRODUCT_CREATE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post('/api/products', {}, config);

      dispatch({
        type: PRODUCT_CREATE_TYPES.PRODUCT_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_TYPES.PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_TYPES.PRODUCT_UPDATE_REQUEST
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
        `/api/products/${product.id}`,
        product,
        config
      );

      dispatch({
        type: PRODUCT_UPDATE_TYPES.PRODUCT_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_TYPES.PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const createProductReview = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW.PRODUCT_CREATE_REVIEW_REQUEST
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

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: PRODUCT_CREATE_REVIEW.PRODUCT_CREATE_REVIEW_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
