import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { ProductList } from './features/products/components/product-list/product-list';
import { ProductDetail } from './features/products/components/product-detail/product-detail';
import { About } from './features/about/about';
import { Contacts } from './features/contacts/contacts';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { adminRoutes } from './features/admin/admin.routes';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'MedNexus - Modern Pharmacy Care & Management' },
  { path: 'products', component: ProductList, title: 'MedNexus - Medications & Products Catalog' },
  { path: 'products/:id', component: ProductDetail, title: 'MedNexus - Medicine Details' },
  { path: 'about', component: About, title: 'MedNexus - About Us & Clinical Standards' },
  { path: 'contacts', component: Contacts, title: 'MedNexus - Pharmacist Contacts & Consultations' },
  { path: 'login', component: Login, canActivate: [guestGuard], title: 'MedNexus - Pharmacist Sign In' },
  { path: 'signup', component: Register, canActivate: [guestGuard], title: 'MedNexus - Register Account' },
  { path: 'register', redirectTo: 'signup', pathMatch: 'full' },
  ...adminRoutes,
];
