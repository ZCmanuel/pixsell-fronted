import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/Auth.service';
import { CommonModule } from '@angular/common';
import { UserRegister } from '../../../../core/interfaces/user-register.interface';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private user: Partial<UserRegister> | null = null;
  errorMessage: string = '';
  showSuccess: boolean = false;

  registerForm = this.fb.group(
    {
      nombre: [``, [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: [``, [Validators.required, Validators.minLength(6)]],
      contraseña_confirmation: [
        ``,
        [Validators.required, Validators.minLength(6)],
      ],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  // No se envia el formulario si no se cumplen las validaciones
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Añadimos los valores del formulario al objeto user
    this.user = this.registerForm.getRawValue() as Partial<UserRegister>;
    this.authService.register(this.user).subscribe({
      next: (resp) => {
        console.log(resp);
        this.showSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else if (err.status === 403) {
          this.errorMessage = 'Acceso denegado';
        } else {
          this.errorMessage = 'Error inesperado';
        }
      },
    });
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('contraseña')?.value;
    const confirm = formGroup.get('contraseña_confirmation')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }
}
