import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (productId, quantity) => {
    dispatch(addToCart(productId, quantity));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return {
    cart,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler
  };
};
