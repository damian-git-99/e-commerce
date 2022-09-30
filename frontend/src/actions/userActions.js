const { userAPI } = require('../api/userAPI');
const { default: axios } = require('axios');
const { ORDER_LIST_TYPES } = require('../reducers/orderReducers');

const {
  USER_LOGIN_TYPES,
  USER_DETAILS_TYPES,
  USER_UPDATE_TYPES,
  USER_LIST_TYPES,
  USER_DELETE_TYPES,
  USER_ADMIN_UPDATE_TYPES
} = require('../reducers/userReducers');

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_REQUEST
      });

      const data = await userAPI.login(email, password);

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

      const data = await userAPI.signup(name, email, password);

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
      const { data } = await axios.get('/api/users/profile', config);

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

      const { data } = await axios.put('/api/users/profile', user, config);

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

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_TYPES.USER_LIST_REQUEST
      });

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get('/api/users', config);

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

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_TYPES.USER_DELETE_REQUEST
      });

      const { userLogin: { userInfo } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.delete(`/api/users/${id}`, config);

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

      const { userLogin: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(`/api/users/${user.id}`, user, config);

      dispatch({ type: USER_ADMIN_UPDATE_TYPES.USER_UPDATE_SUCCESS });

      dispatch({ type: USER_DETAILS_TYPES.USER_DETAILS_SUCCESS, payload: data });
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
