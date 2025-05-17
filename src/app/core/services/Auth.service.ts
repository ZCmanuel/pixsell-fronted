import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserClass } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'token';
  private route = inject(Router);

  private user: User | null = null; // Completo User {user: UserClass, message: string}

  /**
   * REGISTRO DE USUARIO
   * /register -> POST
   * user -> datos del usuario a guardar
   *
   * @param user
   * @returns
   */
  register(user: Partial<UserClass>) {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  /**
   * LOGIN DE USUARIO
   * /login -> POST
   * user -> datos del usuario a guardar
   *
   * @param user
   * @returns
   */
  login(user: Partial<UserClass>) {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/login`, user)
      .pipe(
        tap((res) => {
          console.log('Guardando token en el localStorage');
          localStorage.setItem(this.TOKEN_KEY, res.token); // Guardamos el token en el localStorage
        }),
        tap(() => {
          this.fetchUser().then(() => this.redirectByRole()); // Obtenemos el usuario y redirigimos según su rol
        })
      );
  }

  /**
   * OBTENER TOKEN
   * user -> usuario logueado
   * @returns
   */
  getUser(): UserClass | null {
    console.log('getUser: ', this.user?.user);
    return this.user?.user || null; // Si el usuario es null, devolvemos null
  }

  /**
   * CERRAMOS SESIÓN
   * /logout -> POST
   * Invalidamos el token en el backend
   * Limpiamos el token del localStorage
   * Limpiamos el usuario
   * Redirigimos al usuario a la página de login
   * @returns
   */
  logout() {
    this.http.post(`${this.API_URL}/logout`, {}).subscribe();
    localStorage.removeItem(this.TOKEN_KEY);
    this.user = null;
    this.route.navigate(['/auth/login']);
  }

  /**
   * OBTENER USUARIO
   * /me -> GET
   * user -> usuario logueado
   * Obtenemos el usuario logueado
   * Guardamos el usuario en la variable user
   * Si no se obtiene el usuario, redirigimos al login
   * @returns
   */
  async fetchUser(): Promise<void> {
    try {
      const userResponse = await firstValueFrom(
        this.http.get<User>(`${this.API_URL}/me`)
      );
      this.user = userResponse;
    } catch {
      this.user = null;
      this.logout();
    }
  }

  isAuthenticated(): boolean {
    // Si el token existe, el usuario está autenticado
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  /**
   * REDIRECCIONAR AL USUARIO SEGÚN SU ROL
   * Si el rol es admin, redirigimos a /admin
   * Si el rol es user, redirigimos a /user
   * Si el user es null, redirigimos a /auth/login
   * @returns
   */
  private redirectByRole(): void {
    // Si user es null, no redirigimos
    if (!this.user) {
      this.route.navigate(['/auth/login']);
      return;
    }

    // Si el rol es admin, redirigimos a /admin
    if (this.user.user.rol === 'fotógrafo') {
      this.route.navigate(['/admin']);
    } else {
      // Si el rol es user, redirigimos a /user
      this.route.navigate(['/user']);
    }
  }
}
