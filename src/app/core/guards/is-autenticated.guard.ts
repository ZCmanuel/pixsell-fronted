// guards/is-auth.guard.ts
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const IsAuthenticatedGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.authStatus() === 'authenticated') {
    return true;
  }

  router.navigateByUrl('/auth/login');

  console.error('User not authenticated');
  return false;
};