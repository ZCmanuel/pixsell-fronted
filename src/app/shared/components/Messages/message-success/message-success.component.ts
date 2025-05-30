import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-success',
  imports: [],
  templateUrl: './message-success.component.html',
})
export class MessageSuccessComponent {
  @Input() message: string = '';
}
