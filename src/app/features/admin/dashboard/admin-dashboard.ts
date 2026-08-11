import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProductFeatureService } from '../../products/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly productService = inject(ProductFeatureService);

  username = '';
  productCount = 0;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.username = this.authService.getUsername() ?? 'Admin';

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productCount = products.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load dashboard stats. Is the backend running?';
      },
    });
  }
}
