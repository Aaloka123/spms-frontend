import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Centralize API error handling later
  return next(req);
};
