import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register, renewToken, updateUserProfile } from '../redux/actions/userActions';

export const useUserInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const loginHandle = (email, password) => {
    dispatch(login(email, password));
  };

  const registerHandle = (name, email, password) => {
    dispatch(register(name, email, password));
  };

  const renewTokenHandle = () => {
    dispatch(renewToken());
  };

  const updateUserProfileHandle = (user) => {
    dispatch(updateUserProfile(user));
  };

  const logoutHandle = () => {
    dispatch(logout());
  };

  return {
    userLogin,
    login: loginHandle,
    updateUserProfile: updateUserProfileHandle,
    register: registerHandle,
    logout: logoutHandle,
    renewToken: renewTokenHandle
  };
};
