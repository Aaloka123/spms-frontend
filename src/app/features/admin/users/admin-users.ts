import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../services/admin-user.service';
import { AdminUser } from '../models/admin-user.model';

@Component({
  selector: 'app-admin-users',
  imports: [FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  private readonly userService = inject(AdminUserService);

  allUsers: AdminUser[] = [];
  users: AdminUser[] = [];
  searchText = '';
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
        this.applySearch();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.allUsers = [];
        this.users = [];

        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'You are not allowed to view users. Login as ADMIN.';
        } else {
          this.errorMessage = 'Could not load users. Is the backend running?';
        }
      },
    });
  }

  onSearch(): void {
    this.applySearch();
  }

  private applySearch(): void {
    const q = this.searchText.trim().toLowerCase();

    if (!q) {
      this.users = this.allUsers;
      return;
    }

    this.users = this.allUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        (user.roleName ?? '').toLowerCase().includes(q)
      );
    });
  }

  displayName(user: AdminUser): string {
    return `${user.firstName} ${user.lastName}`.trim();
  }
}
