import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Blocks /admin/* unless the user is logged in with role ADMIN.
 * Used for both parent and child routes so URL hacking cannot open pages.
 */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (!auth.isAdmin()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
