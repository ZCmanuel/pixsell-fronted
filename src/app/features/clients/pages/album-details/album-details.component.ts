import { Component, inject } from '@angular/core';
import { GoBackComponent } from '../../../../shared/components/button-links/go-back/go-back.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  AlbumService,
  SelectImages,
} from '../../../../core/services/Album.service';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../../../../shared/components/user-app/image/image.component';
import { MessageSuccessComponent } from '../../../../shared/components/Messages/message-success/message-success.component';
import { MessageErrorComponent } from '../../../../shared/components/Messages/message-error/message-error.component';

@Component({
  selector: 'app-album-details',
  imports: [
    GoBackComponent,
    CommonModule,
    ImageComponent,
    MessageSuccessComponent,
    MessageErrorComponent,
  ],
  templateUrl: './album-details.component.html',
})
export class AlbumDetailsComponent {
  private albumService = inject(AlbumService);
  private activateRoute = inject(ActivatedRoute);

  // Obtiene el ID del álbum desde los parámetros de la ruta
  private albumId = this.activateRoute.snapshot.params['id'];
  selectedImages: number[] = []; // IDs de las imágenes seleccionadas
  error_message: string = '';
  success_message: string = '';

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
   * Maneja la selección de imágenes en el álbum.
   * @param imageId
   */
  onImageSelection(imageId: number): void {
    const index = this.selectedImages.indexOf(imageId);
    if (index > -1) {
      // Si la imagen ya está seleccionada, la eliminamos del array
      this.selectedImages.splice(index, 1);
    } else {
      // Si la imagen no está seleccionada, la añadimos al array
      this.selectedImages.push(imageId);
    }
    console.log('Imágenes seleccionadas:', this.selectedImages);
  }

  // Enviar selección de imágenes al backend
  sendSelection(): void {
    const estado = this.albumDetailsResource.value()?.estado;
    if (estado === 'pendiente' && this.selectedImages.length > 0) {
      const data: SelectImages = { imagenes: this.selectedImages };
      this.albumService.selectImages(this.albumId, data).subscribe({
        next: () => {
          console.log('Selección enviada exitosamente');
          this.success_message = 'Selección enviada exitosamente.';
        },
        error: (err) => {
          console.error('Error al enviar la selección:', err);
          this.error_message =
            'Error al enviar la selección. Por favor, inténtalo de nuevo más tarde.';
        },
      });
    }
  }
}
