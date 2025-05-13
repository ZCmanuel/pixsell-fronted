import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/user-app/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/user-app/header/header.component';
import { Route, RouterOutlet } from '@angular/router';
import adminRoutes from '../../admin/admin.routes';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  // Rutas base de admin
  basePath = 'admin';

  // Rutas de admin/**
  routes = adminRoutes[0].children?.filter((route) => {
    return route.data?.['visible'];
  }) as Route[];
}
