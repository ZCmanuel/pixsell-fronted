import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Output() cliked = new EventEmitter<void>();

  handleClick(): void {
    this.cliked.emit();
  }
}
