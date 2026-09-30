import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  menuOpen = false;
  searchQuery = '';

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    if (
      event.key === '/' &&
      !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)
    ) {
      event.preventDefault();
      if (typeof document !== 'undefined') {
        const input = document.getElementById('desktop-search-input') as HTMLInputElement | null;
        input?.focus();
      }
    }
  }

  onSearchSubmit(): void {
    const query = this.searchQuery.trim();
    this.closeMenu();
    void this.router.navigate(['/products'], {
      queryParams: query ? { search: query } : {},
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string {
    return this.authService.getUsername() ?? 'User';
  }

  get userInitial(): string {
    const name = this.username.trim();
    return name ? name[0].toUpperCase() : 'U';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeMenu();
  }
}
