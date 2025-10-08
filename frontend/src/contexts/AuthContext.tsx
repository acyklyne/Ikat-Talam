'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '../lib/data';

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
  isLoading: boolean;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      let token = localStorage.getItem('token');

      // Also check cookies for auth-token
      if (!token) {
        const cookies = document.cookie.split(';');
        const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
        if (authTokenCookie) {
          token = authTokenCookie.split('=')[1];
        }
      }

      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
            // Also clear cookie
            document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: IUser, token: string) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('token');
    // Also clear cookie
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
