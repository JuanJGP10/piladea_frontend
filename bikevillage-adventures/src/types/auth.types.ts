export enum Rol {
  ADMIN = 'ADMIN',
  ESTANDAR = 'ESTANDAR',
  ESTABLECIMIENTO = 'ESTABLECIMIENTO'
}

export interface RegisterRequest {
  email: string;
  password: string;
  rol: Rol;
  // Campos opcionales según el rol
  nombre?: string;
  apellido?: string;
  nombreComercial?: string;
  direccion?: string;
  telefono?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Lo que devuelve tu CuponResponseDTO en Java
export interface Cupon {
    id: number;
    urlQR: string;
    canjeado: boolean;
    nombrePremio: string;
    nombreTienda: string;
    fecha: string;
}