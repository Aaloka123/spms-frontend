import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  // Return true for now; add real auth checks later
  return true;
};
