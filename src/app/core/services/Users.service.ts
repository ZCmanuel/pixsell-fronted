import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../interfaces/auth-responser.interface';
import { User, UserClass } from '../interfaces/user.interface';
import { Observable, of, tap } from 'rxjs';
import { UsersList } from '../interfaces/users-response.interface';

interface Options {
  limit?: number;
  offset?: number;
  nombre?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;

  private http = inject(HttpClient);
  private usersCache = new Map<string, UsersList>();
  private userCache = new Map<string, UserClass>();

  /**
   * Lista los usuarios de la API
   *
   * @param opc
   * @returns
   */
  getUsers(opc: Options): Observable<UsersList> {
    const { limit = 40, offset = 0, nombre = '' } = opc;

    const key = `${limit}-${offset}-${nombre}`;
    if (this.usersCache.has(key)) {
      return of(this.usersCache.get(key) as UsersList);
    }

    return (
      this.http
        .get<UsersList>(`${this.API_URL}/admin/users`, {
          params: {
            limit: limit.toString(),
            offset: offset.toString(),
            nombre: nombre,
          },
        })
        // Actualiza el estado de los signals
        .pipe(tap((resp) => this.usersCache.set(key, resp)))
    );
  }
}
