import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * For login/signup pages: if already logged in, send them away
 * (admin → /admin/dashboard, others → home).
 */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  if (auth.isAdmin()) {
    return router.createUrlTree(['/admin/dashboard']);
  }

  return router.createUrlTree(['/']);
};
