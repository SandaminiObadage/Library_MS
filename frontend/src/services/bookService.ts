import axios from "axios";
import { Book, BookFormData } from "../types/Book";
import { tokenService } from "./authService";

const API_URL = 'https://localhost:7155/api/Books';

// Configure axios to handle CORS and SSL issues
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging and authentication
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('Request Data:', JSON.stringify(config.data, null, 2));
    console.log('Authorization Header:', config.headers.Authorization ? 'Present' : 'Not present');
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and token expiration handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.error('API Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request URL:', error.config?.url);
    console.error('Request Method:', error.config?.method);
    console.error('Request Data:', JSON.stringify(error.config?.data, null, 2));
    
    // Handle token expiration
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - token may be expired');
      tokenService.removeToken();
      // Logout here or redirect to login
      window.location.reload(); // Simple approach - reload to reset auth state
    }
    
    return Promise.reject(error);
  }
);

export const getBooks = () => api.get<Book[]>('');
export const getBook = (id: number) => api.get<Book>(`/${id}`);
export const createBook = (book: BookFormData) => {
  // Create a clean DTO that only includes the fields the API expects
  const bookDto = {
    title: book.title,
    author: book.author, 
    description: book.description,
    userId: book.userId
  };
  console.log('Sending Book DTO:', bookDto);
  return api.post<Book>('', bookDto);
};
export const updateBook = (id: number, book: BookFormData) => {
  // Create a clean DTO with ID for PUT requests
  const bookDto = {
    id: id,
    title: book.title,
    author: book.author,
    description: book.description,
    userId: book.userId
  };
  console.log('Sending Book Update DTO:', bookDto);
  return api.put<Book>(`/${id}`, bookDto);
};
export const deleteBook = (id: number) => api.delete(`/${id}`);