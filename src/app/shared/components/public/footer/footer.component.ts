import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import footerRoutes from '../../../../features/public/public.routes'; // Import the public routes


@Component({
  selector: 'footer-component',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  footerRoutes = (footerRoutes[0]?.children || []).filter(
    (route) => route.path && route.data?.['label']
  );
}
