import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProductFeatureService } from '../../products/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly productService = inject(ProductFeatureService);

  username = '';
  productCount = 0;
  lowStockCount = 0;
  expiringCount = 0;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.username = this.authService.getUsername() ?? 'Admin';

    // Use admin endpoint so count includes inactive products
    this.productService.getAllProductsForAdmin().subscribe({
      next: (products) => {
        this.productCount = products.length;
        this.lowStockCount = products.filter((p) => p.stockQuantity <= (p.reorderLevel ?? 10)).length;
        this.expiringCount = products.filter((p) => this.isNearExpiry(p.expiryDate)).length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load dashboard stats. Is the backend running?';
      },
    });
  }

  private isNearExpiry(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const date = new Date(expiryDate);
    if (Number.isNaN(date.getTime())) return false;
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 60;
  }
}
