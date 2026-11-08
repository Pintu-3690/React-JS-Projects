import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext(null);
const EMPTY_FAVORITES = [];

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('shopverse-favorites', EMPTY_FAVORITES);

  const toggleFavorite = (productId) => {
    setFavoriteIds((current) => (
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    ));
  };

  const value = useMemo(
    () => ({ favoriteIds, toggleFavorite }),
    [favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => useContext(FavoritesContext);
