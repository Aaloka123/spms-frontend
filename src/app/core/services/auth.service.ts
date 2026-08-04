import { Injectable } from '@angular/core';
import { LoginResponse } from '../../features/auth/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'authUser';

  /** Save login result in browser storage */
  saveSession(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({
        userId: response.userId,
        username: response.username,
        role: response.role,
      }),
    );
  }

  /** Read JWT token (used later by interceptor) */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** True if token exists */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Clear session on logout */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
