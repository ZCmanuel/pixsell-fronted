import type { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/Auth.service';
import { inject } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authServce = inject(AuthService);
  const token = localStorage.getItem('token');

  // Si el token existe, lo añadimos a la cabecera de la petición
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;


  // Si el token no existe, lo eliminamos del localStorage
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Si el token es inválido, lo eliminamos del localStorage
        localStorage.removeItem('token');
        authServce.logout();
      }
      return throwError(() => error);
    })
  );
};
