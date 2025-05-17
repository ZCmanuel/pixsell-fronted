import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButtonComponent } from '../../../../shared/components/button-links/primary-button/primary-button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth.service';
import { User, UserClass } from '../../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private user: Partial<UserClass> | null = null;
  errorMessage: string = '';

  // Validaciones del formulario de login
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(4)]],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get contrasena() {
    return this.loginForm.get('contraseña');
  }

  onSubmit() {
    // Validación del formulario
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
      return;
    }

    // user -> datos del usuario a guardar
    this.user = this.loginForm.getRawValue() as Partial<UserClass>;

    // Llamada al servicio de login
    this.authService.login(this.user).subscribe({
      next: (resp) => {
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
}
