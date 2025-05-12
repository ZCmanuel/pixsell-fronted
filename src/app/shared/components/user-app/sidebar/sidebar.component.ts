import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_ROUTES } from '../../../../features/admin/admin.routes';
import { CLIENT_ROUTES } from '../../../../features/clients/clients.routes';

@Component({
  selector: 'sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private router = inject(Router);

  // Definimos la ruta de admin
  private isAdmin = computed(() => this.router.url.startsWith('/admin'));

  // Obtenemos las rutas visibles dinámicamente según contexto
  readonly visibleRoutes = computed(() => {
    const routes = this.router.url.startsWith('/admin') ? ADMIN_ROUTES : CLIENT_ROUTES
    
  });

  logout() {
    // Aquí puedes colocar tu lógica de logout
    console.log('Cerrar sesión');
  }
}
