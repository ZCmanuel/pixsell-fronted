import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
        path: '',
        loadChildren: () => import('./features/public/public.routes').then(m => m.PUBLIC_ROUTES),
    },
    {
        path: '**',
        redirectTo: '',
    }
];
