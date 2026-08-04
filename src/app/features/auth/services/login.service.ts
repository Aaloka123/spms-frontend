import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({ //tells this is a service
  providedIn: 'root', // one shared instance for the whole app (Singleton)
})
export class LoginService {
  // Angular creates HttpClient and gives it to us (DI)
  private readonly http = inject(HttpClient);

  // Full URL: http://localhost:8080/api/auth/login
  private readonly loginUrl = `${environment.apiBaseUrl}/auth/login`;

  /**
   * Calls Spring Boot login API.
   * Returns an Observable — the component will subscribe later.
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { username, password };

    // POST JSON body, expect LoginResponse JSON back
    return this.http.post<LoginResponse>(this.loginUrl, body);
  }
}
