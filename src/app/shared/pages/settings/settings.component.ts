import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../components/button-links/primary-button/primary-button.component';
import { UsersService } from '../../../core/services/Users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private userService = inject(UsersService);
  private fb = inject(FormBuilder);
  error_message: string = '';
  success_message: string = '';

  formName = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
  });

  formPassword = this.fb.group(
    {
      contraseña_actual: ['', [Validators.required, Validators.minLength(10)]],
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
   * Actualiza el nombre del usuario autenticado
   * @returns
   */
  updateName() {
    if (this.formName.invalid) {
      this.error_message =
        'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { nombre } = this.formName.value;
    this.userService.updateMe(nombre || undefined).subscribe({
      next: (resp) => {
        console.log(resp);
        this.success_message = 'Nombre actualizado.';
      },
      error: (err) => {
        console.error(err);
        this.error_message =
          'Ha ocurrido un error al actualizar los datos. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al actualizar el perfil', err);
      },
    });
  }

  /**
   * Actualiza la contraseña del usuario autenticado
   * @returns
   */
  updatePassword() {
    if (
      this.formPassword.invalid ||
      this.formPassword.errors?.['passwordMismatch']
    ) {
      this.error_message =
        'Las contraseñas no coinciden o los campos son inválidos.';
      return;
    } else if (this.passwordEqualToPrevious()) {
      this.error_message =
        'La nueva contraseña no puede ser igual a la anterior.';
      return;
    }

    const { contraseña_actual, contraseña, contraseña_confirmation } = 
      this.formPassword.value;

    this.userService
      .updateMe(
        undefined,
        contraseña_actual || '',
        contraseña || '',
        contraseña_confirmation || ''
      )
      .subscribe({
        next: (resp) => {
          // Validar si la respuesta contiene errores
          if (resp && 'error' in resp) {
            this.error_message = resp.error;
            this.success_message = '';
          } else {
            this.success_message = 'Contraseña actualizada correctamente.';
            this.error_message = '';
            this.formPassword.reset();
          }
        },
      });
  }

  /**
   * Comprueba si la contraseña es igual a la anterior
   * @returns boolean
   */
  passwordEqualToPrevious(): boolean {
    const contraseña_actual = this.formPassword.get('contraseña_actual')?.value;
    const contraseña = this.formPassword.get('contraseña')?.value;

    // True o False
    return contraseña_actual === contraseña;
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
