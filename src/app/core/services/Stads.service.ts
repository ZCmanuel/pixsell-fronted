import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AlbumsStads } from '../interfaces/albums-stads.interface';
import { UsersStads } from '../interfaces/users-stads.interface';
import { Observable, tap } from 'rxjs';

export interface AlbumUserStads {
  total_albumes: number;
  albumes_pendientes: number;
}

@Injectable({
  providedIn: 'root',
})
export class StadsService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;
  private http = inject(HttpClient);

  // Cache para almacenar las estadisticas
  private albumStads = new Map<string, AlbumsStads>();
  private usersStads = new Map<string, UsersStads>();
  private albumUserStads = new Map<string, AlbumUserStads>();

  // ENDPOINTS

  /**
   * Obtiene las estadísticas de los usuarios
   * @returns
   */
  getUsersStads(): Observable<UsersStads> {
    return this.http
      .get<UsersStads>(`${this.API_URL}/admin/estadisticas/users`)
      .pipe(tap((resp) => this.usersStads.set('users', resp)));
  }

  /**
   * Obtiene las estadísticas de los álbumes
   * @returns
   */
  getAlbumsStads(): Observable<AlbumsStads> {
    return this.http
      .get<AlbumsStads>(`${this.API_URL}/admin/estadisticas/albums`)
      .pipe(tap((resp) => this.albumStads.set('albums', resp)));
  }

  /**
   * Obtiene las estadísticas de los álbumes de usuario
   * @returns
   */
  getUserAlbumStads(): Observable<AlbumUserStads> {
    return this.http
      .get<AlbumUserStads>(`${this.API_URL}/estadisticas/albums`)
      .pipe(
        tap((resp) => {
          this.albumUserStads.set('albumes-usuario', resp);
        })
      );
  }
}
