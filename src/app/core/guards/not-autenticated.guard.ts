// guards/is-not-auth.guard.ts
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const IsNotAuthenticatedGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.authStatus() === 'not-authenticated') {
    return true;
  }

  router.navigateByUrl('/user');

  return false;
};
