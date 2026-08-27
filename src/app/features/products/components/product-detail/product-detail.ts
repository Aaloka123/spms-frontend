import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductFeatureService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductFeatureService);

  product: Product | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.loading = false;
      this.errorMessage = 'Invalid product id.';
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Product not found.';
      },
    });
  }

  formatPrice(value: number | undefined): string {
    return Number(value ?? 0).toLocaleString();
  }

  formatExpiry(expiryDate?: string): string {
    if (!expiryDate) return '—';
    const date = new Date(expiryDate);
    return Number.isNaN(date.getTime()) ? expiryDate : date.toLocaleDateString();
  }

  stockLabel(stock: number | undefined): string {
    const qty = Number(stock ?? 0);
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 10) return 'Low Stock';
    return 'In Stock';
  }

  stockTone(stock: number | undefined): string {
    const qty = Number(stock ?? 0);
    if (qty <= 0) return 'bg-slate-100 text-slate-600';
    if (qty <= 10) return 'bg-rose-100 text-rose-700';
    return 'bg-emerald-100 text-emerald-700';
  }

  imageFor(product: Product): string {
    const key = `${product.productName} ${product.genericName ?? ''}`.toLowerCase();

    if (key.includes('paracetamol') || key.includes('acetaminophen')) {
      return '/assets/Paracetamol.jpg';
    }
    if (key.includes('brufin') || key.includes('ibuprofen')) {
      return '/assets/Brufin.jpg';
    }
    if (key.includes('lisinopril')) return '/assets/Lisinopril.jpg';
    if (key.includes('albuterol')) return '/assets/Albuterol.jpg';
    if (key.includes('metformin')) return '/assets/Metformin.webp';

    return '/assets/Paracetamol.jpg';
  }
}
