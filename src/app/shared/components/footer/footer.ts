import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly authService = inject(AuthService);

  readonly currentYear = new Date().getFullYear();

  newsletterEmail = '';
  newsletterSubscribed = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubscribeNewsletter(): void {
    if (this.newsletterEmail.trim() && this.newsletterEmail.includes('@')) {
      this.newsletterSubscribed = true;
    }
  }
}
