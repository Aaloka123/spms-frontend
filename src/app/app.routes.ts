import { Routes } from '@angular/router';

// page components
import { Home } from './features/home/home';
import { ProductList } from './features/products/components/product-list/product-list';
import { About } from './features/about/about';
import { Contacts } from './features/contacts/contacts';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: '', component: Home },                 // /
  { path: 'products', component: ProductList },  // /products
  { path: 'about', component: About },           // /about
  { path: 'contacts', component: Contacts },     // /contacts
  { path: 'login', component: Login },           // /login
];
