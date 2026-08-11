import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse } from '../../features/auth/models/login.model';

export interface AuthUser {
  userId: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'authUser';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Save login result in browser storage */
  saveSession(response: LoginResponse): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify({
        userId: response.userId,
        username: response.username,
        role: response.role,
      } satisfies AuthUser),
    );
  }

  /** Read JWT token (used later by interceptor) */
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** True if token exists */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Logged-in user from localStorage (or null) */
  getCurrentUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  /** Display name for header */
  getUsername(): string | null {
    return this.getCurrentUser()?.username ?? null;
  }

  /** Role from login response (ADMIN | USER | PHARMACIST) */
  getRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }

  /** True when the logged-in account is the system admin */
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  /** Clear session on logout */
  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
