'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'user' | 'admin' | null;

interface AuthContextType {
  user: UserRole;
  login: (role: 'user' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserRole>(null);

  // Clear any existing auth state on app start to ensure not logged in by default
  useEffect(() => {
    localStorage.removeItem('userRole');
    setUser(null);
  }, []);

  const login = (role: 'user' | 'admin') => {
    setUser(role);
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
