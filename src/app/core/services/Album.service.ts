import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AlbumsList } from '../interfaces/albums-list.interface';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AlbumCreate } from '../interfaces/albums-create.interface';

interface Options {
  estado?: string;
  nombre?: string;
  orden?: 'ASC' | 'DESC';
  per_page?: number;
}

/**
 * Interfaz para crear un álbum
 * FormData
 */
export interface CreateAlbum {
  nombre: string;
  descripcion: string;
  id_user: number;
  fotos: File[];
}

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;

  private http = inject(HttpClient);
  private albumsCache = new Map<string, AlbumsList>();

  /**
   * Lista los álbumes de la API
   * @param opc
   * @returns
   */
  getAlbums(opc: Options): Observable<AlbumsList> {
    const { estado = '', nombre = '', orden = 'ASC', per_page = 20 } = opc;

    // Genera una clave única para el caché
    const key = `${estado}-${nombre}-${orden}-${per_page}`;
    if (this.albumsCache.has(key)) {
      return new Observable((observer) => {
        observer.next(this.albumsCache.get(key) as AlbumsList);
        observer.complete();
      });
    }

    return this.http
      .get<AlbumsList>(`${this.API_URL}/admin/albums`, {
        params: {
          estado: estado || '',
          nombre: nombre || '',
          orden: orden || 'ASC',
          per_page: per_page.toString(),
        },
      })
      .pipe(
        tap((resp) => {
          this.albumsCache.set(key, resp);
        })
      );
  }

  /**
   * Crear un álbum con fotos usando FormData
   */
  /**
   * Crear un álbum con fotos usando FormData
   * @param album Datos del álbum
   * @returns Observable con la respuesta del servidor
   */
  createAlbum(album: CreateAlbum): Observable<AlbumCreate> {
    const formData = new FormData();

    // Validaciones antes de enviar los datos
    if (!album.nombre || album.nombre.length > 150) {
      return throwError(
        () =>
          new Error(
            'El nombre es obligatorio y no debe superar los 150 caracteres.'
          )
      );
    }
    if (!album.descripcion || album.descripcion.length > 255) {
      return throwError(
        () =>
          new Error(
            'La descripción es obligatoria y no debe superar los 255 caracteres.'
          )
      );
    }
    if (!album.id_user) {
      return throwError(() => new Error('El ID de usuario es obligatorio.'));
    }
    if (!album.fotos || album.fotos.length === 0) {
      return throwError(() => new Error('Debes subir al menos una foto.'));
    }
    for (const foto of album.fotos) {
      if (foto.size > 5120 * 1024) {
        return throwError(() => new Error('Cada imagen debe ser menor a 5MB.'));
      }
      if (!foto.type.startsWith('image/')) {
        return throwError(() => new Error('Cada archivo debe ser una imagen.'));
      }
    }

    // Agregar los datos al FormData
    formData.append('nombre', album.nombre);
    formData.append('descripcion', album.descripcion);
    formData.append('id_user', album.id_user.toString());
    album.fotos.forEach((foto) => {
      formData.append('fotos[]', foto); // Laravel espera un array con esta sintaxis
    });

    // Enviar la solicitud al backend
    return this.http
      .post<AlbumCreate>(`${this.API_URL}/admin/albums`, formData)
      .pipe(
        tap(() => console.log('Álbum creado exitosamente')),
        catchError((error) => {
          console.error('Error al crear el álbum:', error);
          return throwError(() => error);
        })
      );
  }
}
