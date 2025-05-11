import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'secondary-link',
  imports: [RouterModule],
  templateUrl: './secondary-link.component.html',
})
export class SecondaryLinkComponent {
  @Input() label: string = '';
  @Input() routerLink!: string;
}
