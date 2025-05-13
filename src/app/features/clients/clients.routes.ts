import { Routes } from '@angular/router';
import { UsersLayoutComponent } from '../layouts/users-layout/users-layout.component';

const clientRoutes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        title: 'Inicio',
        data: {
          icon: 'inicio',
          visible: true,
          order: 1,
        },
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('./pages/albums/albums.component').then(
            (c) => c.AlbumsComponent
          ),
        title: 'Mis Álbumes',
        data: {
          icon: 'carpeta',
          visible: true,
          order: 2,
        },
      },
      {
        path: 'albums/:id',
        loadComponent: () =>
          import('./pages/album-details/album-details.component').then(
            (c) => c.AlbumDetailsComponent
          ),
        title: 'Detalles álbum',
        data: {
          visible: false,
        },
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('../../shared/pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        title: 'Configuración',
        data: {
          visible: false,
        },
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../../shared/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Mi perfil',
        data: {
          visible: false,
        },
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

export default clientRoutes;
