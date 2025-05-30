import { User } from './users-response.interface';

export interface UpdateMe {
  nombre: string;
  contraseña_actual: string;
  contraseña: string;
  contraseña_confirmation: string;
}

export interface UpdateMeResponse {
  message: string;
  user: User;
}
