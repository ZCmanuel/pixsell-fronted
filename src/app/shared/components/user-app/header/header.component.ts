import { Component, Input } from '@angular/core';
import { SecondaryLinkComponent } from '../../button-links/secondary-link/secondary-link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'head-component',
  imports: [SecondaryLinkComponent, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Base path
  @Input() basePath: string = '';

  // Obtenemos el path de la ruta actual dinamicamente
  get currentPath(): string {
    const currentUrl = window.location.href;
    const path = currentUrl.split('/').pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
  }
}
