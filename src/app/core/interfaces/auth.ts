export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  id: number;
  nombreUsuario: string;
  correo: string;
  roles: string[];
  token: string;
}

export interface RegistroFormulario {
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  nombreCompleto: string;
  fechaNacimiento: Date;
  politicaId: number;
}

export interface UsuarioResponse {
  id: number;
  nombreUsuario: string;
  correo: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  correoVerificado: boolean;
  activo: boolean;
  politicaId: number;
}