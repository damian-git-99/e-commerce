import { USER_ADMIN_UPDATE_TYPES, USER_DETAILS_ADMIN_TYPES } from '../reducers/adminReducers';
import axios from 'axios';

const URL = 'http://localhost:5000/api/users';

export const getUserDetailsAdmin = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${URL}/${id}`, config);
      console.log(data);

      dispatch({
        type: USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADMIN_UPDATE_TYPES.USER_UPDATE_REQUEST
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

      await axios.put(`${URL}/${user.id}`, user, config);

      dispatch({ type: USER_ADMIN_UPDATE_TYPES.USER_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_ADMIN_UPDATE_TYPES.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
