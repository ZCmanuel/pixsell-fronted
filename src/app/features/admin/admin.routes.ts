import { Routes } from '@angular/router';
import { UsersLayoutComponent } from '../layouts/users-layout/users-layout.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        title: 'Inicio',
        data: {
          icon: 'inicio',
          visible: true,
          order: 1,
        },
      },

      {
        path: 'usuarios',
        loadComponent: () => import('./pages/users/users.component').then((c) => c.UsersComponent),
        title: 'Usuarios',
        data: {
          icon: 'usuarios',
          visible: true,
          order: 2,
        },
      },

      {
        path: 'usuarios/:id',
        loadComponent: () => import('./pages/users-details/users-details.component').then((c) => c.UsersDetailsComponent),
        title: 'Detalles usuario',
        data: {
          visible: false, // No aparece en menús
        },
      },

      {
        path: 'albums',
        loadComponent: () => import('../clients/pages/albums/albums.component').then((c) => c.AlbumsComponent),
        title: 'Álbumes',
        data: {
          icon: 'carpeta',
          visible: true,
          order: 3,
        },
      },
      {
        path: 'albums/:id',
        loadComponent: () => import('../clients/pages/album-details/album-details.component').then((c) => c.AlbumDetailsComponent),
        title: 'Detalles álbum',
        data: {
          visible: false, // No aparece en menús
        },
      },

      {
        path: 'perfil',
        loadComponent: () => import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
        title: 'Mi perfil',
        data: {
          visible: false,
        },
      },

      {
        path: 'configuracion',
        loadComponent: () => import('./pages/settings/settings.component').then((c) => c.SettingsComponent),
        title: 'Configuración',
        data: {
          visible: false,
        },
      },

      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
] as Routes;
