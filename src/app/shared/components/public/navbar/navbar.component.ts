import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrimaryLinkComponent } from '../../button-links/primary-link/primary-link.component';
import { SecondaryLinkComponent } from '../../button-links/secondary-link/secondary-link.component';
import { PUBLIC_ROUTES } from '../../../../features/public/public.routes';


@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, PrimaryLinkComponent, SecondaryLinkComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navRoutes = (PUBLIC_ROUTES[0]?.children || []).filter(
    (route) => route.path && route.data?.['label']
  );
}
