import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/components/user-app/sidebar/sidebar.component";
import { HeaderComponent } from "../../../shared/components/user-app/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {

  constructor() { 
    console.log('AdminLayoutComponent constructor');
  }
 }
