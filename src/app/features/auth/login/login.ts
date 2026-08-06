import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // 1 = password form, 2 = OTP form
  step: 1 | 2 = 1;

  username = '';
  password = '';
  showPassword = false;

  otpToken = '';
  maskedEmail = '';
  otpCode = '';

  loading = false;
  errorMessage = '';

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /** Go back from OTP screen to password screen */
  backToPassword(): void {
    this.step = 1;
    this.otpCode = '';
    this.otpToken = '';
    this.maskedEmail = '';
    this.errorMessage = '';
  }

  /** Step 1: username + password */
  onSubmitPassword(): void {
    if (!this.username.trim() || !this.password) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginService.login(this.username.trim(), this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.otpToken = response.otpToken;
        this.maskedEmail = response.maskedEmail;
        this.step = 2; // show OTP screen
        // IMPORTANT: do NOT saveSession here (no JWT yet)
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'Login failed. Is the backend running?';
        }
      },
    });
  }

  /** Step 2: verify 6-digit OTP */
  onSubmitOtp(): void {
    const code = this.otpCode.trim();

    if (!this.otpToken || !/^\d{6}$/.test(code)) {
      this.errorMessage = 'Enter the 6-digit code from your email.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginService.verifyOtp(this.otpToken, code).subscribe({
      next: (response) => {
        // JWT arrives only here
        this.authService.saveSession(response);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 400 || err.status === 401) {
          this.errorMessage = 'Invalid or expired verification code.';
        } else {
          this.errorMessage = 'OTP verification failed. Try again.';
        }
      },
    });
  }
}
