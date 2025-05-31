import { Component, computed, inject, Input } from '@angular/core';
import { SecondaryLinkComponent } from '../../button-links/secondary-link/secondary-link.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth.service';

@Component({
  selector: 'head-component',
  imports: [SecondaryLinkComponent, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Base path
  @Input() basePath: string = '';

  private authService = inject(AuthService);
  user = computed(() => this.authService.user()); 

  // Obtenemos el path de la ruta actual dinamicamente
  get currentPath(): string {
    const currentUrl = window.location.href;
    const path = currentUrl.split('/').pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
  }
}
