import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser({ ...userData, isAuthenticated: true });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, login, logout }), [user])}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);