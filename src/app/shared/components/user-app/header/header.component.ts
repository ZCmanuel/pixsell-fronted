import { Component } from '@angular/core';
import { SecondaryLinkComponent } from "../../button-links/secondary-link/secondary-link.component";

@Component({
  selector: 'head-component',
  imports: [SecondaryLinkComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent { 
  
}
