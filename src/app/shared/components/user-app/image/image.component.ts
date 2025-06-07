import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  imports: [NgIf],
})
export class ImageComponent {
  @Input() src: string = ''; // URL de la imagen
  @Input() id: number = 0; // ID de la imagen
  @Input() isSelected: boolean = false; // Indica si la imagen está seleccionada
  @Input() disabled: boolean = false; // Indica si el checkbox está deshabilitado
  @Output() selectionChange = new EventEmitter<number>(); // Emite el ID de la imagen seleccionada

  showModal: boolean = false; // Estado del modal de imagen ampliada

  // Maneja el cambio del checkbox
  onCheckboxChange(): void {
    if (!this.disabled) {
      this.selectionChange.emit(this.id); // Emitimos el ID de la imagen seleccionada
    }
  }

  // Alterna el estado del modal
  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}