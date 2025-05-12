import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/public/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/public/footer/footer.component';


@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './public-layout.component.html',
})
export class PublicLayoutComponent { }
