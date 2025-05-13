import { Component, computed, inject, Input } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // Rutas a mostrar en el sidebar
  @Input() routes: Route[] = [];
  // ruta actual /admin o /user
  @Input() basePath: string = '';

  // Boton de cerrar sesión
  logout(): void {
    console.log('Cerrar sesión');
  }
}
