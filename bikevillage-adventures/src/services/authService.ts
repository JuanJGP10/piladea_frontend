import { api } from '../lib/api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    // Automáticamente guardamos el token en el sistema API
    if (response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  async register(data: RegisterRequest): Promise<void> {
    await api.post('/auth/register', data);
  },

  logout() {
    api.setToken(null);
    globalThis.location.href = '/login';
  }
};