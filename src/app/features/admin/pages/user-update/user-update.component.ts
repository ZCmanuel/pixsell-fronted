import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../core/services/Users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoBackComponent } from '../../../../shared/components/button-links/go-back/go-back.component';
import { ActivatedRoute } from '@angular/router';
import { MessageErrorComponent } from '../../../../shared/components/Messages/message-error/message-error.component';
import { MessageSuccessComponent } from '../../../../shared/components/Messages/message-success/message-success.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'user-update',
  imports: [
    ReactiveFormsModule,
    GoBackComponent,
    MessageErrorComponent,
    MessageSuccessComponent,
  ],
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent {
  private userService = inject(UsersService);
  private fb = inject(FormBuilder);
  private activateRoute = inject(ActivatedRoute);

  userId = this.activateRoute.snapshot.params['id']; 

  userResouerce = rxResource({
    request: () => ({
      id: this.userId,
    }),

    loader: ({ request }) => {
      return this.userService.getUser(request.id);
    },
  });

  message_error: string = '';
  message_success: string = '';

  formNombre = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  formRol = this.fb.group({
    rol: ['cliente', [Validators.required]],
  });

  formPassword = this.fb.group(
    {
      contraseña: ['', [Validators.required, Validators.minLength(10)]],
      contraseña_confirmation: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  /**
   * Actualiza el nombre del usuario
   * @returns
   */
  updateName() {
    if (this.formNombre.invalid) {
      this.message_error =
        'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { nombre } = this.formNombre.value;

    this.userService.updateUser(this.userId, nombre || '').subscribe({
      next: (resp) => {
        if (resp && 'error' in resp) {
          this.message_error = resp.error;
          this.message_success = '';
        } else {
          this.message_success = 'Nombre actualizado correctamente.';
          this.message_error = '';
          this.formNombre.reset();
        }
      },
    });
  }

  updatePassword() {
    if (this.formPassword.invalid) {
      this.message_error =
        'Por favor, completa todos los campos correctamente.';
      return;
    } else if (this.formPassword.errors?.['passwordMismatch']) {
      this.message_error = 'Las contraseñas no coinciden.';
      return;
    }

    const { contraseña, contraseña_confirmation } = this.formPassword.value;

    this.userService
      .updateUser(
        this.userId,
        undefined,
        undefined,
        contraseña || '',
        contraseña_confirmation || ''
      )
      .subscribe({
        next: (resp) => {
          if (resp && 'error' in resp) {
            this.message_error = resp.error;
            this.message_success = '';
          } else {
            this.message_success = 'Contraseña actualizada correctamente.';
            this.message_error = '';
            this.formPassword.reset();
          }
        },
      });
  }

  updateRol() {
    if (this.formRol.invalid) {
      this.message_error = 'Por favor, seleccione un rol.';
      return;
    }

    const { rol } = this.formRol.value;

    this.userService.updateUser(this.userId, undefined, rol || '').subscribe({
      next: (resp) => {
        if (resp && 'error' in resp) {
          this.message_error = resp.error;
          this.message_success = '';
        } else {
          this.message_success = 'Rol actualizado correctamente.';
          this.message_error = '';
          this.formRol.reset();
        }
      },
    });
  }

  /**
   * Validación para comprobar que las contraseñas coinciden
   * @param formGroup
   * @returns
   */
  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('contraseña')?.value;
    const confirm = formGroup.get('contraseña_confirmation')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }
}
