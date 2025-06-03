import { Component, inject, OnInit, signal } from '@angular/core';
import {
  AlbumService,
  CreateAlbum,
} from '../../../../core/services/Album.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/Users.service';
import { MessageErrorComponent } from '../../../../shared/components/Messages/message-error/message-error.component';
import { MessageSuccessComponent } from '../../../../shared/components/Messages/message-success/message-success.component';

@Component({
  selector: 'app-album-create',
  imports: [
    MessageErrorComponent,
    MessageSuccessComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './album-create.component.html',
})
export class AlbumCreateComponent implements OnInit {
  private albumService = inject(AlbumService);
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);

  tempImages = signal<string[]>([]);
  imageFileList: FileList | undefined = undefined; // Lista de archivos de imagen
  message_error: string = '';
  message_success: string = '';

  users: { id_usuario: number; email: string }[] = []; // Lista de usuarios

  formAlbum = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    id_user: [0, [Validators.required]],
  });

  ngOnInit(): void {
    // Cargar la lista de usuarios
    this.usersService.getUsers({ limit: 100 }).subscribe({
      next: (resp) => {
        this.users = resp.users.map((user) => ({
          id_usuario: user.id_usuario,
          email: user.email,
        }));
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.message_error = 'No se pudo cargar la lista de usuarios.';
      },
    });
  }

  createAlbum(): void {
    if (
      this.formAlbum.invalid ||
      !this.imageFileList ||
      this.imageFileList.length === 0
    ) {
      this.message_error =
        'Por favor, completa todos los campos y selecciona al menos una imagen.';
      return;
    }

    const { nombre, descripcion, id_user } = this.formAlbum.value;

    const albumData: CreateAlbum = {
      nombre: nombre!,
      descripcion: descripcion!,
      id_user: id_user!,
      fotos: Array.from(this.imageFileList), // Convertir FileList a array
    };

    this.albumService.createAlbum(albumData).subscribe({
      next: (resp) => {
        this.message_success = 'Álbum creado exitosamente.';
        this.message_error = '';
        this.formAlbum.reset();
        this.imageFileList = undefined; // Limpiar la lista de archivos
        this.tempImages.set([]); // Limpiar las imágenes temporales
      },
      error: (err) => {
        console.error('Error al crear el álbum:', err);
        this.message_error =
          err.message || 'No se pudo crear el álbum. Inténtalo de nuevo.';
        this.message_success = '';
      },
    });
  }

  onFileChange(event: Event) {
    const filesList = (event.target as HTMLInputElement).files;

    this.imageFileList = filesList ?? undefined;

    const imageUrls = Array.from(filesList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages.set(imageUrls);
  }
}
