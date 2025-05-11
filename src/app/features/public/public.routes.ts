import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '../layouts/public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { AbautAsComponent } from './abaut-as/abaut-as.component';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio',
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        title: 'Galería',
      },
      {
        path: 'about',
        component: AbautAsComponent,
        title: 'Sobre nosotros',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contacto',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
