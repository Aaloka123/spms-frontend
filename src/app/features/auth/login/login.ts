import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
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

  readonly otpLength = 6;

  // 1 = password form, 2 = OTP form
  step: 1 | 2 = 1;

  username = '';
  password = '';
  showPassword = false;

  otpToken = '';
  maskedEmail = '';
  otpDigits: string[] = Array(this.otpLength).fill('');

  loading = false;
  errorMessage = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  get otpCode(): string {
    return this.otpDigits.join('');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /** Go back from OTP screen to password screen */
  backToPassword(): void {
    this.step = 1;
    this.otpDigits = Array(this.otpLength).fill('');
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
        this.otpDigits = Array(this.otpLength).fill('');
        this.step = 2;
        // Focus first OTP box after view updates
        setTimeout(() => this.focusOtpInput(0), 0);
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

  /** Handle typing one digit */
  onOtpDigitChange(index: number, value: string): void {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...this.otpDigits];
    next[index] = digit;
    this.otpDigits = next;

    if (digit && index < this.otpLength - 1) {
      this.focusOtpInput(index + 1);
    }
  }

  /** Backspace moves to previous box */
  onOtpKeyDown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      event.preventDefault();
      this.focusOtpInput(index - 1);
    }
  }

  /** Paste full 6-digit code into the boxes */
  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, this.otpLength);
    if (!pasted) return;

    const next = Array(this.otpLength).fill('');
    for (let i = 0; i < pasted.length; i += 1) {
      next[i] = pasted[i];
    }
    this.otpDigits = next;

    const focusIndex = Math.min(pasted.length, this.otpLength - 1);
    this.focusOtpInput(focusIndex);
  }

  /** Step 2: verify 6-digit OTP */
  onSubmitOtp(): void {
    const code = this.otpCode;

    if (!this.otpToken || !/^\d{6}$/.test(code)) {
      this.errorMessage = 'Enter the 6-digit code from your email.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginService.verifyOtp(this.otpToken, code).subscribe({
      next: (response) => {
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

  private focusOtpInput(index: number): void {
    const input = this.otpInputs?.get(index)?.nativeElement;
    input?.focus();
    input?.select();
  }
}
