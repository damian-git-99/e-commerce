export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_TYPES.USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_TYPES.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_TYPES.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_TYPES.USER_LIST_RESET: return { users: [] };
    default:
      return state;
  }
};

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

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_TYPES.USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_TYPES.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_TYPES.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
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

export const USER_LIST_TYPES = {
  USER_LIST_REQUEST: 'USER_LIST_REQUEST',
  USER_LIST_SUCCESS: 'USER_LIST_SUCCESS',
  USER_LIST_FAIL: 'USER_LIST_FAIL',
  USER_LIST_RESET: 'USER_LIST_RESET'
};

export const USER_DETAILS_ADMIN_TYPES = {
  USER_DETAILS_ADMIN_REQUEST: 'USER_DETAILS_ADMIN_REQUEST',
  USER_DETAILS_ADMIN_SUCCESS: 'USER_DETAILS_ADMIN_SUCCESS',
  USER_DETAILS_ADMIN_FAIL: 'USER_DETAILS_ADMIN_FAIL',
  USER_DETAILS_ADMIN_RESET: 'USER_DETAILS_ADMIN_RESET'
};

export const USER_DELETE_TYPES = {
  USER_DELETE_REQUEST: 'USER_DELETE_REQUEST',
  USER_DELETE_SUCCESS: 'USER_DELETE_SUCCESS',
  USER_DELETE_FAIL: 'USER_DELETE_FAIL'
};

export const USER_ADMIN_UPDATE_TYPES = {
  USER_UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_UPDATE_FAIL: 'USER_UPDATE_FAIL',
  USER_UPDATE_RESET: 'USER_UPDATE_RESET'
};
