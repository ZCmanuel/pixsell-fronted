import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PUBLIC_ROUTES } from '../../../features/public/public.routes';
import { PrimaryLinkComponent } from "../primary-link/primary-link.component";
import { SecondaryLinkComponent } from "../secondary-link/secondary-link.component";

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
