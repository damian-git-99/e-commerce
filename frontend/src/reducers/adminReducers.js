export const userDetailsAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_ADMIN_TYPES.USER_DETAILS_ADMIN_RESET: return { user: {} };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_TYPES.USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_ADMIN_UPDATE_TYPES.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_ADMIN_UPDATE_TYPES.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_UPDATE_TYPES.USER_UPDATE_RESET:
      return {
        user: {}
      };
    default:
      return state;
  };
};

export const USER_DETAILS_ADMIN_TYPES = {
  USER_DETAILS_ADMIN_REQUEST: 'USER_DETAILS_ADMIN_REQUEST',
  USER_DETAILS_ADMIN_SUCCESS: 'USER_DETAILS_ADMIN_SUCCESS',
  USER_DETAILS_ADMIN_FAIL: 'USER_DETAILS_ADMIN_FAIL',
  USER_DETAILS_ADMIN_RESET: 'USER_DETAILS_ADMIN_RESET'
};

export const USER_ADMIN_UPDATE_TYPES = {
  USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAIL: 'USER_UPDATE_FAIL',
  USER_UPDATE_RESET: 'USER_UPDATE_RESET'
};
