import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { ProductList } from './features/products/components/product-list/product-list';
import { About } from './features/about/about';
import { Contacts } from './features/contacts/contacts';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { adminRoutes } from './features/admin/admin.routes';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'about', component: About },
  { path: 'contacts', component: Contacts },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'signup', component: Register, canActivate: [guestGuard] },
  { path: 'register', redirectTo: 'signup', pathMatch: 'full' },
  ...adminRoutes,
];
