import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse } from '../../features/auth/models/login.model';

export interface AuthUser {
  userId: number;
  username: string;
  role: string;
}

interface JwtPayload {
  sub?: string;
  role?: string;
  userId?: number;
  exp?: number;
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

  /** Read JWT token (used by interceptor) */
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Decode JWT payload (UI checks only — backend still enforces auth) */
  getTokenPayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const base64 = token.split('.')[1];
      if (!base64) return null;
      const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
      const padded =
        normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
      const json = atob(padded);
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }

  /** True if token is missing or past exp */
  isTokenExpired(): boolean {
    const exp = this.getTokenPayload()?.exp;
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  }

  /** True if a non-expired JWT exists */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }

    return true;
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
    return this.getCurrentUser()?.username ?? this.getTokenPayload()?.sub ?? null;
  }

  /**
   * Role from JWT claim first (harder to fake by editing authUser only),
   * then fall back to stored login response.
   */
  getRole(): string | null {
    const fromJwt = this.getTokenPayload()?.role;
    if (fromJwt) return fromJwt.trim();
    const fromUser = this.getCurrentUser()?.role;
    return fromUser?.trim() ?? null;
  }

  /** True when this session is the system admin portal account */
  isAdmin(): boolean {
    const role = this.getRole()?.toUpperCase();
    const username = this.getUsername()?.trim().toLowerCase();
    // Only the seeded admin username with ADMIN role may use /admin
    return role === 'ADMIN' && username === 'admin';
  }

  /** Clear session on logout */
  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
