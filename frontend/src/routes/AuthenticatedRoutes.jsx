import React from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthenticatedRoutes = () => {
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  if (!userInfo) {
    return <Navigate to={'/login'} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
