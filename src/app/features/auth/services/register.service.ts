import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterRequest, RegisterResponse, RoleDto } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly http = inject(HttpClient);

  private readonly usersUrl = `${environment.apiBaseUrl}/users`;
  private readonly rolesUrl = `${environment.apiBaseUrl}/roles`;

  /** Public signup — always assigns USER role (never ADMIN). */
  register(payload: Omit<RegisterRequest, 'roleId'>): Observable<RegisterResponse> {
    return this.getUserRoleId().pipe(
      switchMap((roleId) =>
        this.http.post<RegisterResponse>(this.usersUrl, {
          ...payload,
          roleId,
        } satisfies RegisterRequest),
      ),
    );
  }

  private getUserRoleId(): Observable<number> {
    return this.http.get<RoleDto[]>(this.rolesUrl).pipe(
      map((roles) => {
        const userRole = roles.find((role) => role.roleName === 'USER');
        if (!userRole) {
          throw new Error('USER role was not found on the server.');
        }
        return userRole.roleId;
      }),
    );
  }
}
