import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-error',
  imports: [],
  templateUrl: './message-error.component.html',
})
export class MessageErrorComponent {
  // input message_error: string
  @Input() message: string = '';
}
