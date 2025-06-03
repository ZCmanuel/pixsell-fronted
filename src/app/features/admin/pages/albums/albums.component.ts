import { Component, inject, signal } from '@angular/core';
import { AlbumService } from '../../../../core/services/Album.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.component.html',
})
export class AlbumsComponent {
  private albumsService = inject(AlbumService);
  name = signal('');
  estado = signal('');


  albumResource = rxResource({
    request: () => ({
      estado: this.estado(),
      nombre: this.name(),
      orden: undefined,
      per_page: 20,
    }),

    loader: ({ request }) => {
      return this.albumsService.getAlbums({
        estado: request.estado,
        nombre: request.nombre,
        orden: request.orden,
        per_page: request.per_page,
      });
    },
  });
}
