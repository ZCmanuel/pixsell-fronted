import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'go-back',
  imports: [],
  templateUrl: './go-back.component.html',
})
export class GoBackComponent {
  private location = inject(Location);

  goBack() {
    this.location.back(); // Navega a la ruta anterior
  }
}
