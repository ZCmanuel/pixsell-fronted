import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../../../core/services/Users.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private usersService = inject(UsersService);
  name = signal('');

  usersResource = rxResource({
    request: () => ({
      limit: 40,
      offset: 0,
      nombre: this.name(),
    }),

    loader: ({ request }) => {
      return this.usersService.getUsers({
        limit: request.limit,
        offset: request.offset,
        nombre: request.nombre,
      });
    },
  });
}
