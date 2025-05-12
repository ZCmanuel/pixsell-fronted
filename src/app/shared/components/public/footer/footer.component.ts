import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PUBLIC_ROUTES } from '../../../../features/public/public.routes';


@Component({
  selector: 'footer-component',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  footerRoutes = (PUBLIC_ROUTES[0]?.children || []).filter(
    (route) => route.path && route.data?.['label']
  );
}
