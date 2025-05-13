import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  logout() {
    // Aquí puedes colocar tu lógica de logout
    console.log('Cerrar sesión');
  }
}
