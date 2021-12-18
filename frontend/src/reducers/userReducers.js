const USER_LOGIN_TYPES = {
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
  USER_LOGOUT: 'USER_LOGOUT'
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_TYPES.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_TYPES.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_TYPES.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_TYPES.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

module.exports = {
  userLoginReducer,
  USER_LOGIN_TYPES
};
