import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserClass } from '../interfaces/user.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { UsersList, User } from '../interfaces/users-response.interface';
import { UpdateMeResponse } from '../interfaces/update-me.interface';

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
  private userCache = new Map<string, User>();

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

  /**
   * Obtiene un usuario por su ID
   *
   * @param id
   * @returns
   */
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.API_URL}/admin/users/${id}`)
      .pipe(tap((resp) => this.userCache.set(id.toString(), resp)));
  }

  /**
   * Actualiza el usuario autenticado
   *
   * @param nombre
   * @param contraseña_actual
   * @param contraseña
   * @param contraseña_confirmation
   * @returns
   */
  updateMe(
    nombre?: string,
    contraseña_actual?: string,
    contraseña?: string,
    contraseña_confirmation?: string
  ): Observable<UpdateMeResponse | { error: string }> {
    const body: any = {};

    // Solo incluir los campos que se proporcionen
    if (nombre) {
      body.nombre = nombre;
    }
    if (contraseña_actual) {
      body.contraseña_actual = contraseña_actual;
    }
    if (contraseña) {
      body.contraseña = contraseña;
    }
    if (contraseña_confirmation) {
      body.contraseña_confirmation = contraseña_confirmation;
    }

    return this.http
      .put<UpdateMeResponse>(`${this.API_URL}/user/update`, body)
      .pipe(
        tap((resp) => {
          // Actualiza el cache del usuario
          this.userCache.set('me', resp.user);
        }),
        catchError((error) => {
          if (error.status === 422 && error.error.errors?.contraseña) {
            console.error(
              'Error de confirmación de contraseña:',
              error.error.errors.contraseña
            );
            return of({
              error: 'La confirmación de la contraseña no coincide.',
            });
          } else if (error.status === 403) {
            return of({ error: 'La contraseña actual es incorrecta.' });
          }

          return of({ error: 'Ha ocurrido un error al actualizar el perfil.' });
        })
      );
  }

  updateUser(
    id: number,
    nombre?: string,
    rol?: string,
    contraseña?: string,
    contraseña_confirmation?: string
  ): Observable<UpdateMeResponse | { error: string }> {
    const body: any = {};

    // Solo incluir los campos que se proporcionen
    if (nombre) {
      body.nombre = nombre;
    }
    if (rol) {
      body.rol = rol;
    }
    if (contraseña) {
      body.contraseña = contraseña;
    }
    if (contraseña_confirmation) {
      body.contraseña_confirmation = contraseña_confirmation;
    }

    console.log('Datos enviados al servidor:', body); // Debug para verificar los datos

    return this.http
      .put<UpdateMeResponse>(`${this.API_URL}/admin/users/${id}`, body)
      .pipe(
        tap((resp) => {
          // Actualiza el cache del usuario
          this.userCache.set(id.toString(), resp.user);
        }),
        catchError((error) => {
          if (error.status === 422 && error.error.errors?.contraseña) {
            console.error(
              'Error de confirmación de contraseña:',
              error.error.errors.contraseña
            );
            return of({
              error: 'La confirmación de la contraseña no coincide.',
            });
          } else if (error.status === 403) {
            return of({ error: 'La contraseña actual es incorrecta.' });
          }

          return of({ error: 'Ha ocurrido un error al actualizar el perfil.' });
        })
      );
  }
}
