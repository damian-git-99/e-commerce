import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, savePaymentMethod, saveShippingAddress } from '../redux/actions/cartActions';

export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (productId, quantity) => {
    dispatch(addToCart(productId, quantity));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const savePaymentMethodHandler = (paymentMethod) => {
    dispatch(savePaymentMethod(paymentMethod));
  };

  const saveShippingAddressHandler = (data) => {
    dispatch(saveShippingAddress(data));
  };

  return {
    cart,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    savePaymentMethod: savePaymentMethodHandler,
    saveShippingAddress: saveShippingAddressHandler
  };
};
