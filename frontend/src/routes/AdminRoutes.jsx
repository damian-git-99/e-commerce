import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { UnauthorizedActionError } from '../screens/UnauthorizedActionError ';

export const AdminRoutes = () => {
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  if (!userInfo) return <Navigate to={'/login'} replace />;
  if (!userInfo.isAdmin) return <UnauthorizedActionError />;
  return (
    <>
      <Outlet />
    </>
  );
};
