import { Component, inject } from '@angular/core';
import { AlbumService } from '../../../../core/services/Album.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  imports: [RouterLink, CommonModule],
  templateUrl: './albums.component.html',
})
export class AlbumsComponent {
  private albumsService = inject(AlbumService);

  albumsResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.albumsService.getUserAlbums();
    },
  });

   // Método para rastrear los álbumes por su ID
  trackByAlbumId(index: number, album: any): number {
    return album.id_album;
  }
}
