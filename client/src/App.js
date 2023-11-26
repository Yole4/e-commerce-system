import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import Header from './pages/Header';
import SideBar from './pages/SideBar';
import Home from './pages/body/Home';
import Dashboard from './pages/body/Dashboard';
import UsersList from './pages/body/UsersList';
import Categories from './pages/body/Categories';
import Undefine from './pages/404/Undefine';
import Products from './pages/body/Products';
import Orders from './pages/body/Orders';
import MyHome from './pages/body/MyHome';
import Address from './pages/body/Address';
import Login from './pages/Login';
import UserOrders from './pages/body/UserOrders';

function App() {
  const {user} = useContext(AuthContext);
  
  return (

    <Routes>
      <Route path="/home" element={<Home /> } />
      <Route path="/dashboard" element={user? <Dashboard /> : <Navigate to="/" replace /> } />
      <Route path="/users" element={user? <UsersList /> : <Navigate to="/" replace /> } />
      <Route path="/categories" element={user? <Categories /> : <Navigate to="/" replace /> } />
      <Route path="/products" element={user? <Products /> : <Navigate to="/" replace /> } />
      <Route path="/orders" element={user? <Orders /> : <MyHome /> } />
      <Route path="/address" element={user? <Address /> : <MyHome /> } />
      <Route path="/login" element={user? <MyHome /> : <Login /> } />
      <Route path="/user-orders" element={user? <UserOrders /> : <MyHome /> } />
      <Route path="/" element={<MyHome /> } />

      <Route path="*" element={<Undefine />} />
    </Routes>
  );
}

export default App;
