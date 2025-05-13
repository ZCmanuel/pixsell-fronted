import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes'),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.default),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/clients/clients.routes').then((m) => m.default),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/public/public.routes').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
