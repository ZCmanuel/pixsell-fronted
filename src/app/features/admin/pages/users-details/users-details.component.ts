import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../../core/services/Users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from '../../../../shared/components/button-links/go-back/go-back.component';
import { AlbumService } from '../../../../core/services/Album.service';

@Component({
  selector: 'app-users-details',
  imports: [CommonModule, RouterLink, GoBackComponent],
  templateUrl: './users-details.component.html',
})
export class UsersDetailsComponent {
  // Injectamos el servicio de usuarios
  private userService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);
  private albumService = inject(AlbumService);

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

  albumsResource = rxResource({
    request: () => ({
      id: this.userId,
    }),

    loader: ({ request }) => {
      return this.albumService.getAlbumById(request.id);
    },
  });

  trackByAlbum(index: number, album: any): number {
    return album.id_album; // Utiliza el ID del álbum como clave única
  }
}
