const { default: axios } = require('axios');
const {
  USER_LOGIN_TYPES,
  USER_REGISTER_TYPES
} = require('../reducers/userReducers');

const login = (email, password) => {
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
        '/api/users/login',
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

const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGIN_TYPES.USER_LOGOUT });
};

const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_TYPES.USER_REGISTER_REQUEST
      });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post('/api/users/signup',
        { name, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_TYPES.USER_REGISTER_SUCCESS,
        payload: data
      });

      dispatch({
        type: USER_LOGIN_TYPES.USER_LOGIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_TYPES.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
};

module.exports = {
  login,
  logout,
  register
};
