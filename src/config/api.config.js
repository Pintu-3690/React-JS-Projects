export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.marketplace.com/v1';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAILS: (id) => `/products/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
  },
  VENDOR: {
    PRODUCTS: '/vendor/products',
    ANALYTICS: '/vendor/analytics',
  }
};