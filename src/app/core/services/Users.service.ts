import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // URL de la API -> http://localhost:8000/api
  private readonly API_URL = environment.apiUrl;
}
