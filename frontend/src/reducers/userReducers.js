const USER_LOGIN_TYPES = {
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
  USER_LOGOUT: 'USER_LOGOUT'
};

const USER_REGISTER_TYPES = {
  USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAIL: 'USER_REGISTER_FAIL'
};

const USER_DETAILS_TYPES = {
  USER_DETAILS_REQUEST: 'USER_DETAILS_REQUEST',
  USER_DETAILS_SUCCESS: 'USER_DETAILS_SUCCESS',
  USER_DETAILS_FAIL: 'USER_DETAILS_FAIL'
};

const USER_UPDATE_TYPES = {
  USER_UPDATE_PROFILE_REQUEST: 'USER_UPDATE_PROFILE_REQUEST',
  USER_UPDATE_PROFILE_SUCCESS: 'USER_UPDATE_PROFILE_SUCCESS',
  USER_UPDATE_PROFILE_FAIL: 'USER_UPDATE_PROFILE_FAIL',
  USER_UPDATE_PROFILE_RESET: 'USER_UPDATE_PROFILE_RESET'
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

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_TYPES.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_TYPES.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_TYPES.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_TYPES.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_TYPES.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_TYPES.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_TYPES.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_TYPES.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_TYPES.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

module.exports = {
  userLoginReducer,
  USER_LOGIN_TYPES,
  userRegisterReducer,
  USER_REGISTER_TYPES,
  userDetailsReducer,
  userUpdateProfileReducer,
  USER_DETAILS_TYPES,
  USER_UPDATE_TYPES
};
