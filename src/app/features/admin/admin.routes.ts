import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersLayoutComponent } from '../layouts/users-layout/users-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersDetailsComponent } from './pages/users-details/users-details.component';
import { AlbumsComponent } from '../clients/pages/albums/albums.component';
import { AlbumDetailsComponent } from '../clients/pages/album-details/album-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: DashboardComponent,
        title: 'Inicio',
        data: {
          icon: 'inicio',
          visible: true,
          order: 1,
        },
      },

      {
        path: 'usuarios',
        component: UsersComponent,
        title: 'Usuarios',
        data: {
          icon: 'usuarios',
          visible: true,
          order: 2,
        },
      },

      {
        path: 'usuarios/:id',
        component: UsersDetailsComponent,
        title: 'Detalles usuario',
        data: {
          visible: false, // No aparece en menús
        },
      },

      {
        path: 'albums',
        component: AlbumsComponent,
        title: 'Álbumes',
        data: {
          icon: 'carpeta',
          visible: true,
          order: 3,
        },
      },
      {
        path: 'albums/:id',
        component: AlbumDetailsComponent,
        title: 'Detalles álbum',
        data: {
          visible: false, // No aparece en menús
        },
      },

      {
        path: 'perfil',
        component: ProfileComponent,
        title: 'Mi perfil',
        data: {
          visible: false,
        },
      },

      {
        path: 'configuracion',
        component: SettingsComponent,
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
];
