import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);
const EMPTY_CART = [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('shopverse-cart', EMPTY_CART);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock ?? 99) }
            : item
        );
      }
      return product.stock === 0 ? prevCart : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => prevCart.flatMap((item) => {
      if (item.id !== productId) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 99;

    return {
      cart,
      cartCount,
      subtotal,
      shipping,
      cartTotal: subtotal + shipping,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
    };
  }, [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);