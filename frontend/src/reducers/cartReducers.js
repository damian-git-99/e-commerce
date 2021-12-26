/* eslint-disable no-case-declarations */
export const CART_TYPES = {
  CART_ADD_ITEM: 'CART_ADD_ITEM',
  CART_REMOVE_ITEM: 'CART_REMOVE_ITEM',
  CART_SAVE_SHIPPING_ADDRESS: 'CART_SAVE_SHIPPING_ADDRESS'
};

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_TYPES.CART_ADD_ITEM:
      const item = action.payload;
      const existItemInCart = state.cartItems.find(
        (x) => x.product === item.product
      );

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
    case CART_TYPES.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    default:
      return state;
  }
};
