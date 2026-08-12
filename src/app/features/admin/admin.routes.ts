import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';
import { AdminLayout } from './layout/admin-layout';
import { AdminDashboard } from './dashboard/admin-dashboard';
import { AdminUsers } from './users/admin-users';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    component: AdminLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers },
    ],
  },
];
