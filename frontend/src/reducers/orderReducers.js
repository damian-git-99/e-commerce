export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TYPES.ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_TYPES.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_TYPES.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_TYPES.ORDER_PAY_REQUEST:
      return {
        loading: true
      };
    case ORDER_PAY_TYPES.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case ORDER_PAY_TYPES.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_PAY_TYPES.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const ORDER_TYPES = {
  ORDER_CREATE_REQUEST: 'ORDER_CREATE_REQUEST',
  ORDER_CREATE_SUCCESS: 'ORDER_CREATE_SUCCESS',
  ORDER_CREATE_FAIL: 'ORDER_CREATE_FAIL'
};

export const ORDER_PAY_TYPES = {
  ORDER_PAY_REQUEST: 'ORDER_PAY_REQUEST',
  ORDER_PAY_SUCCESS: 'ORDER_PAY_SUCCESS',
  ORDER_PAY_FAIL: 'ORDER_PAY_FAIL',
  ORDER_PAY_RESET: 'ORDER_PAY_RESET'
};
