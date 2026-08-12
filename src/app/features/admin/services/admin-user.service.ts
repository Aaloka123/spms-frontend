import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminUser } from '../models/admin-user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private readonly http = inject(HttpClient);

  private readonly usersUrl = `${environment.apiBaseUrl}/users`;

  /** ADMIN only — backend: @PreAuthorize("hasAuthority('ADMIN')") */
  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.usersUrl);
  }
}
