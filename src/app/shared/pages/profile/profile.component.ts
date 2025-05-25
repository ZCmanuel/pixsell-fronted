import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/Auth.service';
import { UserClass } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent { 
  private authService = inject(AuthService);
  user: UserClass | null = this.authService.user();
}
