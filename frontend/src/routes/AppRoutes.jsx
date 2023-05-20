import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { CartScreen } from '../screens/cart/CartScreen';
import { ShippingScreen } from '../screens/payment/ShippingScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import { PlaceOrderScreen } from '../screens/order/PlaceOrderScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { ProductEditScreen } from '../screens/admin/ProductEditScreen';
import { ProductImageEditScreen } from '../screens/admin/ProductImageEditScreen';
import { OrderListScreen } from '../screens/admin/OrderListScreen';
import { AdminRoutes } from './AdminRoutes';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { ProductScreen } from '../screens/product/ProductScreen';
import { OrderScreen } from '../screens/order/OrderScreen';
import { ProductListScreen } from '../screens/admin/ProductListScreen';
import { UserEditScreen } from '../screens/admin/UserEditScreen';
import { UserListScreen } from '../screens/admin/UserListScreen';

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/search/:keyword' element={<HomeScreen />} />
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
