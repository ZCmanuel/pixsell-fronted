import { Component, Input } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'secondary-link',
  imports: [RouterModule, RouterLinkActive],
  templateUrl: './secondary-link.component.html',
})
export class SecondaryLinkComponent {
  @Input() label: string = '';
  @Input() routerLink!: string;
}
