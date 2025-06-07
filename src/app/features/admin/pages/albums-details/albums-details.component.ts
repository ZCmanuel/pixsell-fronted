import { Component, inject } from '@angular/core';
import { GoBackComponent } from '../../../../shared/components/button-links/go-back/go-back.component';
import { AlbumService } from '../../../../core/services/Album.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../../../../shared/components/user-app/image/image.component';
import { MessageSuccessComponent } from "../../../../shared/components/Messages/message-success/message-success.component";
import { MessageErrorComponent } from "../../../../shared/components/Messages/message-error/message-error.component";

@Component({
  selector: 'app-albums-details',
  imports: [GoBackComponent, CommonModule, ImageComponent, MessageSuccessComponent, MessageErrorComponent],
  templateUrl: './albums-details.component.html',
})
export class AlbumsDetailsComponent {
  private albumService = inject(AlbumService);
  private activateRoute = inject(ActivatedRoute);

  // Obtiene el ID del álbum desde los parámetros de la ruta
  private albumId = this.activateRoute.snapshot.params['id'];
  selectedImages: number[] = []; // IDs de las imágenes seleccionadas
  success_message: string = '';
  error_message: string = '';

  albumDetailsResource = rxResource({
    request: () => ({
      id: this.albumId,
    }),

    loader: ({ request }) => {
      return this.albumService.getAlbumDetails(request.id);
    },
  });

  /**
   *
   */
  isSelectedImage(id: number): boolean {
    const seleccionadas = this.albumDetailsResource.value()?.seleccionadas;
    if (!seleccionadas) return false;
    const found = seleccionadas.some((img) => img.id_multimedia === id);
    if (found && !this.selectedImages.includes(id)) {
      this.selectedImages.push(id);
    }
    return found;
  }

  /**
   * Finaliza el álbum
   */
  finalizeAlbum(): void {
    const estado = this.albumDetailsResource.value()?.estado;
    if (estado === 'seleccionado') {
      this.albumService.finaliceAlbum(this.albumId).subscribe({
        next: () => {
          console.log('Álbum finalizado exitosamente');
          this.success_message = 'Álbum finalizado exitosamente.';
        },
        error: (err) => {
          console.error('Error al finalizar el álbum:', err);
          this.error_message =
            'Error al finalizar el álbum. Por favor, inténtalo de nuevo más tarde.';
        },
      });
    }
  }
}
