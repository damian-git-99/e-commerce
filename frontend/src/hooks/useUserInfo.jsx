import { useDispatch, useSelector } from 'react-redux';
import { login, updateUserProfile } from '../actions/userActions';

export const useUserInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const loginHandle = (email, password) => {
    dispatch(login(email, password));
  };

  const updateUserProfileHandle = (user) => {
    dispatch(updateUserProfile(user));
  };

  return {
    userLogin,
    login: loginHandle,
    updateUserProfile: updateUserProfileHandle
  };
};
