import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'primary-link',
  imports: [RouterModule],
  templateUrl: './primary-link.component.html',
})
export class PrimaryLinkComponent { 
  @Input() label: string = '';
  @Input() routerLink!: string;
}
