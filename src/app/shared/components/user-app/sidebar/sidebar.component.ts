import { Component, inject, Input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
[x: string]: any;
  // Rutas a mostrar en el sidebar
  @Input() routes: Route[] = [];
  // ruta actual /admin o /user
  @Input() basePath: string = '';

  private authService = inject(AuthService);

  // Boton de cerrar sesión
  logout(): void {
    console.log('Logout');
    this.authService.logout();
  }

  isSmallScreen(): boolean {
  return window.innerWidth < 1180;
}
}
 