import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

export type AdminMenuIcon =
  | 'dashboard'
  | 'users'
  | 'store'
  | 'badge-check'
  | 'package'
  | 'trending-up'
  | 'star'
  | 'settings';

export type AdminMenuItem = {
  label: string;
  path: string;
  icon: AdminMenuIcon;
};

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  menuOpen = false;

  /** Same labels/order/icons as MedNexus AdminNavbar.tsx */
  readonly menuItems: AdminMenuItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'User', path: '/admin/users', icon: 'users' },
    { label: 'Vendor', path: '/admin/vendors', icon: 'store' },
    { label: 'Approve Vendor', path: '/admin/approve-vendor', icon: 'badge-check' },
    { label: 'Product', path: '/admin/products', icon: 'package' },
    { label: 'Profit', path: '/admin/profit', icon: 'trending-up' },
    { label: 'Review', path: '/admin/reviews', icon: 'star' },
    { label: 'Setting', path: '/admin/settings', icon: 'settings' },
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
