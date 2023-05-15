import axios from 'axios';
import {
  PRODUCT_CREATE_TYPES
} from '../reducers/productReducers';

const URL = 'http://localhost:5000/api/products';
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

      const { data } = await axios.post(URL, {}, config);

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
