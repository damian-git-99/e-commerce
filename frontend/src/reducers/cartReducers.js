/* eslint-disable no-case-declarations */
export const CART_TYPES = {
  CART_ADD_ITEM: 'CART_ADD_ITEM',
  CART_REMOVE_ITEM: 'CART_REMOVE_ITEM'
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_TYPES.CART_ADD_ITEM:
      const item = action.payload;
      const existItemInCart = state.cartItems.find((x) => x.product === item.product);

      if (existItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product === existItemInCart.product ? item : p
          )
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, item]
      };

    case CART_TYPES.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      };
    default:
      return state;
  }
};
