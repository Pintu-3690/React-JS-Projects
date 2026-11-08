import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Catalog } from '../pages/Catalog';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { VendorDashboard } from '../pages/VendorDashboard';
import { Unauthorized } from '../pages/Unauthorized';
import { NotFound } from '../pages/NotFound';
import { OrderSuccess } from '../pages/OrderSuccess';
import { Login } from '../pages/Login';
import { ProductDetails } from '../pages/ProductDetails';
import { ProtectedRoute } from './ProtectedRoute';
import { ROLES } from '../config/constants';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/product/:slug" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-success" element={<OrderSuccess />} />
    <Route path="/login" element={<Login />} />

    <Route
      path="/vendor"
      element={
        <ProtectedRoute allowedRoles={[ROLES.VENDOR, ROLES.ADMIN]}>
          <VendorDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);