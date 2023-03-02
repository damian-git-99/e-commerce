import { USER_LIST_TYPES } from '../reducers/adminReducers';

const { default: axios } = require('axios');
const { ORDER_LIST_TYPES } = require('../reducers/orderReducers');

const {
  USER_LOGIN_TYPES,
  USER_DETAILS_TYPES,
  USER_UPDATE_TYPES
} = require('../reducers/userReducers');

const URL = `${process.env.REACT_APP_HOST}/api/users`;

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `${URL}/login`,
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGIN_TYPES.USER_LOGOUT });
  dispatch({ type: USER_DETAILS_TYPES.USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_TYPES.ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_TYPES.USER_LIST_RESET });
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(`${URL}/signup`,
        { name, email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_TYPES.USER_DETAILS_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(`${URL}/profile`, config);

      dispatch({
        type: USER_DETAILS_TYPES.USER_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_TYPES.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_TYPES.USER_UPDATE_PROFILE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(`${URL}/profile`, user, config);

      dispatch({
        type: USER_UPDATE_TYPES.USER_UPDATE_PROFILE_SUCCESS,
        payload: data
      });

      // Update user state in redux store
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_SUCCESS,
        payload: data
      });

      // Update user profile in redux store
      dispatch({
        type: USER_DETAILS_TYPES.USER_DETAILS_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_TYPES.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};
