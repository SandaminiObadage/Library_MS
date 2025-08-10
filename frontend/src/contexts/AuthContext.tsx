import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, AuthContextType } from '../types/Auth';
import { authService, tokenService } from '../services/authService';
import {  getUserIdFromToken, isTokenExpired } from '../utils/jwtUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = tokenService.getToken();
      const storedUser = tokenService.getUser();

      if (storedToken && storedUser) {
        // Check if token is expired
        if (isTokenExpired(storedToken)) {
          // Token expired, clear storage
          tokenService.removeToken();
          tokenService.removeUser();
        } else {
          // Token valid, restore auth state
          setToken(storedToken);
          setUser(storedUser);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginData): Promise<void> => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      const authData = response.data;

      // Store token and user data
      tokenService.setToken(authData.token);
      
      // Extract user ID from token
      const userId = getUserIdFromToken(authData.token);
      
      console.log('Login successful - extracted userId:', userId);
      console.log('Login authData:', authData);
      
      const userData = {
        id: userId || undefined,
        username: authData.username,
        email: authData.email
      };
      
      console.log('Storing user data:', userData);
      
      tokenService.setUser(userData);

      // Update state
      setToken(authData.token);
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Clear any existing auth data on login failure
      tokenService.removeToken();
      tokenService.removeUser();
      setToken(null);
      setUser(null);
      
      // Re-throw error for component handling
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      // Just return success, user will need to sign in
      console.log('Registration successful for user:', response.data.username);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Re-throw error for component handling
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    console.log('Logout function called');
    
    // Clear all storage using the comprehensive clear method
    tokenService.clearAll();
    
    // Update state
    setToken(null);
    setUser(null);
    
    console.log('Logout completed - all auth data cleared');
    
    // Force a page refresh to reset application state
    window.location.reload();
  };

  const isAuthenticated = Boolean(token && user);

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
