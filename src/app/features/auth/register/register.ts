import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);

  /** MedNexus-style single name field; split for SPMS backend */
  fullName = '';
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  errorMessage = '';

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /** Digits only, max 10 — same idea as MedNexus phone sanitize */
  onPhoneChange(value: string): void {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  onSubmit(): void {
    this.errorMessage = '';

    const name = this.fullName.trim();
    if (!name || !this.email.trim() || !this.password) {
      this.errorMessage = 'Please fill in all required fields.';
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

    const { firstName, lastName } = this.splitFullName(name);
    const username = this.buildUsername(this.email.trim());

    this.loading = true;

    this.registerService
      .register({
        firstName,
        lastName,
        username,
        email: this.email.trim(),
        password: this.password,
        phoneNumber: this.phoneNumber,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          void this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 409) {
            this.errorMessage = 'This email or username is already registered.';
          } else if (err.status === 400) {
            this.errorMessage = err.error?.detail || 'Invalid registration details.';
          } else if (err.message?.includes('USER role')) {
            this.errorMessage = 'Could not find USER role. Is the backend seeded?';
          } else {
            this.errorMessage = 'Signup failed. Is the backend running?';
          }
        },
      });
  }

  private splitFullName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: parts[0] };
    }
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(' '),
    };
  }

  /** SPMS backend requires username; derive from email local-part */
  private buildUsername(email: string): string {
    const local = email.split('@')[0] ?? 'user';
    const cleaned = local.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 40);
    return cleaned || `user${Date.now().toString().slice(-6)}`;
  }
}
