// API Service for backend calls
// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    // CAMBIO 2: Recuperar token al iniciar
    this.token = localStorage.getItem('jwt_token');
  }

  setToken(token: string | null) {
    this.token = token;
    // CAMBIO 3: Guardar o borrar del navegador
    if (token) {
      localStorage.setItem('jwt_token', token);
    } else {
      localStorage.removeItem('jwt_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Modificamos para recibir el endpoint
  private getHeaders(endpoint: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // LÓGICA DE PROTECCIÓN:
    // Si la ruta empieza por '/auth', NO enviamos el token, 
    // aunque lo tengamos guardado.
    const isPublicEndpoint = endpoint.startsWith('/auth');

    if (this.token && !isPublicEndpoint) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, options?.params), {
      method: 'GET',
      headers: this.getHeaders(endpoint),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, options?.params), {
      method: 'POST',
      headers: this.getHeaders(endpoint),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, options?.params), {
      method: 'PUT',
      headers: this.getHeaders(endpoint),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, options?.params), {
      method: 'DELETE',
      headers: this.getHeaders(endpoint),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  }
}

export const api = new ApiService(API_BASE_URL);

// Example usage:
// import { api } from '@/lib/api';
// 
// // Set auth token after login
// api.setToken('your-jwt-token');
// 
// // GET request
// const users = await api.get('/users');
// 
// // POST request
// const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });
// 
// // GET with query params
// const filteredUsers = await api.get('/users', { params: { role: 'admin' } });
