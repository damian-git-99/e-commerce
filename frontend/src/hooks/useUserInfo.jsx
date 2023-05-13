import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

export const useUserInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const loginHandle = (email, password) => {
    dispatch(login(email, password));
  };

  return {
    userLogin, login: loginHandle
  };
};
