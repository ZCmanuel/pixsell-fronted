import { Component, inject } from '@angular/core';
import { UsersService } from '../../../../core/services/Users.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from '../../../../shared/components/button-links/go-back/go-back.component';

@Component({
  selector: 'user-update',
  imports: [ReactiveFormsModule, GoBackComponent],
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent {
  private userService = inject(UsersService);
  private fb = inject(FormBuilder);

  formNombre = this.fb.group({});
  formRol = this.fb.group({});

  formPassword = this.fb.group({});
  updateNombre() {}
  updatePassword() {}
  updateRol() {}
}
