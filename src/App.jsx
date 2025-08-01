import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import {Toaster} from 'sonner'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/products/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetails from './pages/OrderDetails';
import MyOrders from './pages/MyOrders';
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/AdminHome';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditProduct from './components/admin/EditProduct';
import OrderManagement from './components/admin/OrderManagement';

import { Provider } from 'react-redux';
import store from './redux/store';
import ProtectedRoute from './components/shared/ProtectedRoute';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrders />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App


