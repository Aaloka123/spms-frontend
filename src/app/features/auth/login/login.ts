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
  // Inject services (Dependency Injection)
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  showPassword = false;
  loading = false;
  errorMessage = ''; // show API errors in the UI

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.username.trim() || !this.password) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Call backend; subscribe to handle success/error
    this.loginService.login(this.username.trim(), this.password).subscribe({
      next: (response) => {
        // 1) save token + user info
        this.authService.saveSession(response);
        // 2) stop loading
        this.loading = false;
        // 3) go to home page
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        // 401 = bad username/password from Spring Security
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'Login failed. Is the backend running?';
        }
      },
    });
  }
}
