import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../screens/HomeScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { ShippingScreen } from '../screens/ShippingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { PlaceOrderScreen } from '../screens/PlaceOrderScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { CartScreen } from '../screens/CartScreen';
import { UserListScreen } from '../screens/admin/UserListScreen';
import { UserEditScreen } from '../screens/admin/UserEditScreen';
import { ProductListScreen } from '../screens/admin/ProductListScreen';
import { ProductEditScreen } from '../screens/ProductEditScreen';
import { ProductImageEditScreen } from '../screens/ProductImageEditScreen';
import { OrderListScreen } from '../screens/OrderListScreen';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { AdminRoutes } from './AdminRoutes';

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/search/:keyword' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart/:id?' element={<CartScreen />} />

        <Route element={<AuthenticatedRoutes />}>
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={< PlaceOrderScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
          <Route path='/admin/product/:id/image/edit' element={<ProductImageEditScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
        </Route>

      </Routes>
  );
};
