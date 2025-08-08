import axios from "axios";
import { LoginData, RegisterData, AuthResponse } from "../types/Auth";

const API_URL = 'https://localhost:7155/api/Auth';

// Configure axios for auth endpoints
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Add request interceptor for debugging
authApi.interceptors.request.use(
  (config) => {
    console.log('Auth API Request:', config.method?.toUpperCase(), config.url);
    console.log('Request Data:', JSON.stringify(config.data, null, 2));
    return config;
  },
  (error) => {
    console.error('Auth Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
authApi.interceptors.response.use(
  (response) => {
    console.log('Auth API Response:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.error('Auth API Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials: LoginData) => authApi.post<AuthResponse>('/login', credentials),
  register: (userData: RegisterData) => authApi.post<AuthResponse>('/register', userData),
};

// Token management
export const tokenService = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
  
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  
  setUser: (user: any) => {
    localStorage.setItem('authUser', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('authUser');
  },
  
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },
  
  // Clear all auth data
  clearAll: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    // Clear any other potential auth keys
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
