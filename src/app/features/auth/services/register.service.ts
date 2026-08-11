import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterRequest, RegisterResponse } from '../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly http = inject(HttpClient);

  private readonly usersUrl = `${environment.apiBaseUrl}/users`;

  /** Public signup — backend always assigns USER role. */
  register(payload: Omit<RegisterRequest, 'roleId'>): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.usersUrl, payload);
  }
}
