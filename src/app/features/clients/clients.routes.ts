import { Routes } from '@angular/router';
import { UsersLayoutComponent } from '../layouts/users-layout/users-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumDetailsComponent } from './pages/album-details/album-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: DashboardComponent,
        title: 'Inicio',
        data: {
          icon: 'home',
          visible: true,
          order: 1,
        },
      },
      {
        path: 'albums',
        component: AlbumsComponent,
        title: 'Mis Álbumes',
        data: {
          icon: 'image',
          visible: true,
          order: 2,
        },
      },
      {
        path: 'albums/:id',
        component: AlbumDetailsComponent,
        title: 'Detalles album',
        data: {
          visible: false, // No aparece en menús
        },
      },
      {
        path: 'configuracion',
        component: SettingsComponent,
        title: 'Configuración',
        data: {
          icon: 'settings',
          visible: true,
          order: 3,
        },
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        title: 'Mi perfil',
        data: {
          icon: 'person',
          visible: true,
          order: 4,
        },
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
];
