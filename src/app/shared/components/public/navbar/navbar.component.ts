import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrimaryLinkComponent } from '../../button-links/primary-link/primary-link.component';
import { SecondaryLinkComponent } from '../../button-links/secondary-link/secondary-link.component';
import routes from '../../../../features/public/public.routes'; // Import the public routes

@Component({
  selector: 'navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    PrimaryLinkComponent,
    SecondaryLinkComponent,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Extraemos las rutas hijas del layout principal
  navRoutes = (routes.find((r) => r.path === '')?.children || []).filter(
    (route) => route.path && route.data?.['label']
  );
}
