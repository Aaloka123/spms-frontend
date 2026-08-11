import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly registerService = inject(RegisterService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  confirmEmail = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    // Old JWT in storage must not interfere with signup
    this.authService.logout();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /** Digits only, max 10 */
  onPhoneChange(value: string): void {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  onSubmit(): void {
    this.errorMessage = '';

    const firstName = this.firstName.trim();
    const lastName = this.lastName.trim();
    const email = this.email.trim().toLowerCase();
    const confirmEmail = this.confirmEmail.trim().toLowerCase();

    if (!firstName || !lastName || !email || !this.password) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (email !== confirmEmail) {
      this.errorMessage = 'Emails do not match.';
      return;
    }

    if (!/^\d{10}$/.test(this.phoneNumber)) {
      this.errorMessage = 'Phone number must be exactly 10 digits.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const username = this.buildUsername(email);

    this.loading = true;

    this.registerService
      .register({
        firstName,
        lastName,
        username,
        email,
        password: this.password,
        phoneNumber: this.phoneNumber,
      })
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => {
          void this.router.navigate(['/login'], {
            replaceUrl: true,
            queryParams: { registered: '1' },
          });
        },
        error: (err) => {
          this.errorMessage = this.readError(err);
          // Already registered → send them to login
          if (err?.status === 409) {
            setTimeout(() => {
              void this.router.navigate(['/login'], {
                replaceUrl: true,
                queryParams: { registered: 'exists' },
              });
            }, 1200);
          }
        },
      });
  }

  private readError(err: any): string {
    const status = err?.status;
    const detail = err?.error?.detail as string | undefined;
    const title = err?.error?.title as string | undefined;

    if (status === 409) {
      return detail || title || 'This email or phone is already registered. Redirecting to login…';
    }
    if (status === 400) {
      const fieldErrors = err?.error?.errors;
      if (fieldErrors && typeof fieldErrors === 'object') {
        const first = Object.values(fieldErrors)[0];
        if (typeof first === 'string') return first;
      }
      return detail || 'Invalid registration details.';
    }
    if (err?.message?.includes('USER role')) {
      return 'Could not find USER role. Is the backend seeded?';
    }
    if (status === 0) {
      return 'Cannot reach backend. Is it running on http://localhost:8080?';
    }
    return detail || 'Signup failed. Please try again.';
  }

  /** Unique-enough username from email local-part */
  private buildUsername(email: string): string {
    const local = email.split('@')[0] ?? 'user';
    const cleaned = local.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 30);
    const suffix = Date.now().toString().slice(-4);
    return `${cleaned || 'user'}_${suffix}`;
  }
}
