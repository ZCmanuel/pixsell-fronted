import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { IsAuthenticatedGuard } from '../../core/guards/is-autenticated.guard';
import { IsAdminGuard } from '../../core/guards/is-admin.guard';

const adminRoutes: Routes = [
  {
    path: '',
    canMatch: [IsAuthenticatedGuard, IsAdminGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Inicio',
        data: { icon: 'inicio', visible: true, order: 1 },
      },
      {
        path: 'usuarios/:id',
        loadComponent: () =>
          import('./pages/users-details/users-details.component').then(
            (m) => m.UsersDetailsComponent
          ),
        title: 'Detalles usuario',
        data: { visible: false },
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/users/users.component').then((m) => m.UsersComponent),
        title: 'Usuarios',
        data: { icon: 'usuarios', visible: true, order: 2 },
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('./pages/albums/albums.component').then(
            (m) => m.AlbumsComponent
          ),
        title: 'Álbumes',
        data: { icon: 'carpeta', visible: true, order: 3 },
      },
      {
        path: 'albums/nuevo',
        loadComponent: () =>
          import('./pages/album-create/album-create.component').then(
            (m) => m.AlbumCreateComponent
          ),
        title: 'Crear álbum',
        data: { visible: false },
      },
      {
        path: 'albums/:id',
        loadComponent: () =>
          import('./pages/albums-details/albums-details.component').then(
            (m) => m.AlbumsDetailsComponent
          ),
        title: 'Detalles álbum',
        data: { visible: false },
      },
      {
        path: 'usuarios/actualizar/:id',
        loadComponent: () =>
          import('../admin/pages/user-update/user-update.component').then(
            (m) => m.UserUpdateComponent
          ),
        title: 'Actualizar usuario',
        data: { visible: false },
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../../shared/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Mi perfil',
        data: { visible: false },
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('../../shared/pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        title: 'Configuración',
        data: { visible: false },
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
];

export default adminRoutes;
