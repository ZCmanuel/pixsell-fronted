export interface UserResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}
