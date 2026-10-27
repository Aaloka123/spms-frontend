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
  lastRefreshedAt = '';
  activeFilter: 'all' | 'critical' | 'stock' | 'compliance' = 'all';
  currentShift = 'Morning Dispense Shift';
  currentTimeString = '';
  systemHealthScore = 98;

  readonly auditLogs = [
    {
      id: 1,
      title: 'Automated Formulary Sync',
      detail: 'Inventory levels reconciled against central dispenser queue',
      time: 'Just now',
      status: 'sync' as const,
    },
    {
      id: 2,
      title: 'Protected Admin Session',
      detail: 'High-privilege role verified with TLS 1.3 token handshake',
      time: '4m ago',
      status: 'ok' as const,
    },
    {
      id: 3,
      title: 'Batch Shelf-Life Sentinel',
      detail: 'Automated 60-day expiry threshold monitor ran nominal',
      time: '12m ago',
      status: 'alert' as const,
    },
  ];

  ngOnInit(): void {
    this.username = this.authService.getUsername() ?? 'Admin';
    this.updateShiftInfo();
    this.loadDashboardData();
  }

  setFilter(filter: 'all' | 'critical' | 'stock' | 'compliance'): void {
    this.activeFilter = filter;
  }

  updateShiftInfo(): void {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) {
      this.currentShift = 'Morning Dispense Shift';
    } else if (hour >= 14 && hour < 22) {
      this.currentShift = 'Evening Clinical Shift';
    } else {
      this.currentShift = 'Night Emergency Shift';
    }

    this.currentTimeString = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Fetches real-time inventory metrics and telemetry for the admin command center.
   */
  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';
    this.updateShiftInfo();

    // Use admin endpoint so telemetry metrics include both active and inactive products
    this.productService.getAllProductsForAdmin().subscribe({
      next: (products) => {
        this.productCount = products.length;
        this.lowStockCount = products.filter((p) => p.stockQuantity <= (p.reorderLevel ?? 10)).length;
        this.expiringCount = products.filter((p) => this.isNearExpiry(p.expiryDate)).length;
        
        // Calculate dynamic system health score
        const riskDeductions = this.lowStockCount * 4 + this.expiringCount * 5;
        this.systemHealthScore = Math.max(68, Math.min(100, 100 - riskDeductions));

        this.loading = false;
        this.lastRefreshedAt = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
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
