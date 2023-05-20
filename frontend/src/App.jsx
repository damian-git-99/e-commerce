import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { OrderListScreen } from './screens/OrderListScreen';
import { OrderScreen } from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { ProductScreen } from './screens/ProductScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { UserEditScreen } from './screens/admin/UserEditScreen';
import { UserListScreen } from './screens/admin/UserListScreen';
import { ProductListScreen } from './screens/admin/ProductListScreen';
import { ProductImageEditScreen } from './screens/ProductImageEditScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen/>} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={< PlaceOrderScreen/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/product/:id' element={<ProductScreen/>} />
            <Route path='/cart/:id?' element={<CartScreen/>} />
            <Route path='/admin/userlist' element={<UserListScreen/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
            <Route path='/admin/productlist' element={<ProductListScreen/>} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
            <Route path='/admin/product/:id/image/edit' element={<ProductImageEditScreen/>} />
            <Route path='/admin/orderlist' element={<OrderListScreen/>} />
            <Route path='/search/:keyword' element={<HomeScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
