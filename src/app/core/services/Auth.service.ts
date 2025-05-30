import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserClass } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { UserResponse } from '../interfaces/auth-responser.interface';
import { UserRegister } from '../interfaces/user-register.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;
  private http = inject(HttpClient);
  private route = inject(Router);

  // Siganals
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<UserClass | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  // Computed
  user = computed(() => this._user()); // Usuario autenticado
  isAdmin = computed(() => this._user()?.rol.includes('fotógrafo') ?? null); // Si el usuario es fotógrafo

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  /**
   * ESTADOS DE AUTENTICACION
   */
  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  login(user: Partial<UserClass>): Observable<boolean> {
    return this.http
      .post<UserResponse>(`${this.API_URL}/login`, user)
      .pipe(map((resp) => this.handleAuthSuccess(resp)));
  }

  register(user: Partial<UserRegister>): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this._authStatus.set('not-authenticated');
      return of(false);
    }

    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      map((resp) => this.handleAuthRefresh(resp.user)),
      catchError((err) => this.handleAuthError(err))
    );
  }

  logout() {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this._token.set(null);
    localStorage.removeItem('token');
    this.route.navigateByUrl('/auth');
  }

  handleAuthSuccess({ user, token }: UserResponse) {
    setTimeout(() => {}, 20000);

    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    this.redirectByRole();

    localStorage.setItem('token', token);
    return true;
  }

  handleAuthRefresh(user: UserClass) {
    setTimeout(() => {}, 20000);

    this._user.set(user);
    this._authStatus.set('authenticated');
    this.redirectByRole();

    return true;
  }

  handleAuthError(err: any) {
    console.error('handleAuthError', err);
    this.logout();
    // Pausa el error para ver si falla
    return of(false);
  }

  redirectByRole() {
    if (this.isAdmin()) {
      this.route.navigateByUrl('/admin');
    } else {
      this.route.navigateByUrl('/user');
    }
  }
}
