// ng build --configuration production -> remplaza el archivo environment.ts por environment.prod.ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://pixsell-backend-production.up.railway.app/api', // Cambia por tu dominio real
  // apiUrl: 'http://localhost/api', // Cambia por tu dominio real
};
