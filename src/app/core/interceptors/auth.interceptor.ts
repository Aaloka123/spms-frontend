import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/** Attach Bearer JWT to API requests when the user is logged in. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Never attach token to public auth/signup/role endpoints
  const url = req.url;
  const isPublicAuth =
    url.includes('/api/auth/') ||
    (req.method === 'POST' && url.includes('/api/users')) ||
    (req.method === 'GET' && url.includes('/api/roles'));

  if (isPublicAuth) {
    return next(req);
  }

  const token = inject(AuthService).getToken();

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
