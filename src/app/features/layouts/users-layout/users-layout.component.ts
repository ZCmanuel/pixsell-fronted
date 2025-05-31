import { Component } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/user-app/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/user-app/header/header.component';
import userRoutes from '../../clients/clients.routes';

@Component({
  selector: 'app-users-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './users-layout.component.html',
})
export class UsersLayoutComponent {
  // Rutas base de usuarios
  basePath = 'user';

  // Rutas de users/**
  routes = userRoutes[0].children?.filter((route) => {
    return route.data?.['visible'];
  }) as Route[];

}
