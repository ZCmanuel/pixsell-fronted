import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../shared/components/user-app/sidebar/sidebar.component";
import { HeaderComponent } from "../../../shared/components/user-app/header/header.component";

@Component({
  selector: 'app-users-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './users-layout.component.html',
})
export class UsersLayoutComponent { }
