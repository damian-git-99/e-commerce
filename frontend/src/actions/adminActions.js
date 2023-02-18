import { USER_ADMIN_UPDATE_TYPES, USER_DELETE_TYPES, USER_DETAILS_ADMIN_TYPES, USER_LIST_TYPES } from '../reducers/adminReducers';

const { default: axios } = require('axios');

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_TYPES.USER_LIST_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get('http://localhost:5000/api/users', config);

      dispatch({
        type: USER_LIST_TYPES.USER_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_TYPES.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

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

      const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config);
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

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_TYPES.USER_DELETE_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      await axios.delete(`http://localhost:5000/api/users/${id}`, config);

      dispatch({ type: USER_DELETE_TYPES.USER_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_DELETE_TYPES.USER_DELETE_FAIL,
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

      await axios.put(`http://localhost:5000/api/users/${user.id}`, user, config);

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
