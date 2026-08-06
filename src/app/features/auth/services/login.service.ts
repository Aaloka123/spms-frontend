import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  PendingOtpResponse,
  VerifyOtpRequest,
} from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  private readonly loginUrl = `${environment.apiBaseUrl}/auth/login`;
  private readonly verifyOtpUrl = `${environment.apiBaseUrl}/auth/verify-otp`;
  private readonly forgotPasswordUrl = `${environment.apiBaseUrl}/auth/forgot-password`;
  private readonly resetPasswordUrl = `${environment.apiBaseUrl}/auth/reset-password`;

  /** Step 1: username + password → OTP email (no JWT) */
  login(username: string, password: string): Observable<PendingOtpResponse> {
    const body: LoginRequest = { username, password };
    return this.http.post<PendingOtpResponse>(this.loginUrl, body);
  }

  /** Step 2: otpToken + code → JWT session */
  verifyOtp(otpToken: string, code: string): Observable<LoginResponse> {
    const body: VerifyOtpRequest = { otpToken, code };
    return this.http.post<LoginResponse>(this.verifyOtpUrl, body);
  }

  /** Optional: start password reset OTP */
  forgotPassword(email: string): Observable<PendingOtpResponse> {
    return this.http.post<PendingOtpResponse>(this.forgotPasswordUrl, { email });
  }

  /** Optional: verify reset OTP + set new password */
  resetPassword(
    otpToken: string,
    code: string,
    newPassword: string,
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.resetPasswordUrl, {
      otpToken,
      code,
      newPassword,
    });
  }
}
