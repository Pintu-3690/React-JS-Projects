import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Header/Navbar';
import { AppRoutes } from './routes/AppRoutes';
import { Footer } from './components/layout/Footer/Footer';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <ToastProvider>
              <div className="app-shell">
                <Navbar />
                <AppRoutes />
                <Footer />
              </div>
            </ToastProvider>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}