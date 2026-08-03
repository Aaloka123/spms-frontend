import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { ProductComponents } from './product/product';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'products',
    component: ProductComponents,
  },
];
