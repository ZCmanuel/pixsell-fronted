import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../../core/services/Users.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-details',
  imports: [CommonModule],
  templateUrl: './users-details.component.html',
})
export class UsersDetailsComponent {
  // Injectamos el servicio de usuarios
  private userService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);

  // Id del usuario a mostrar
  userId = this.activateRoute.snapshot.params['id'];

  userResouerce = rxResource({
    request: () => ({
      id: this.userId,
    }),

    loader: ({ request }) => {
      return this.userService.getUser(request.id);
    },
  });
}
