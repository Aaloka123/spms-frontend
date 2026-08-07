import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFeatureService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductFeatureService);

  allProducts: Product[] = [];
  products: Product[] = [];

  searchText = '';
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.allProducts = [];
        this.products = [];
        this.loading = false;
        this.errorMessage = 'Could not load products. Is the backend running?';
      },
    });
  }

  onSearch(): void {
    const q = this.searchText.trim().toLowerCase();

    if (!q) {
      this.products = this.allProducts;
      return;
    }

    this.products = this.allProducts.filter((p) =>
      p.productName.toLowerCase().includes(q) ||
      (p.genericName ?? '').toLowerCase().includes(q) ||
      (p.brand ?? '').toLowerCase().includes(q),
    );
  }

  getImage(product: Product): string {
    const key = `${product.productName} ${product.genericName ?? ''}`.toLowerCase();

    if (key.includes('paracetamol') || key.includes('acetaminophen')) return '/assets/Paracetamol.jpg';
    if (key.includes('brufin') || key.includes('ibuprofen')) return '/assets/Brufin.jpg';
    if (key.includes('lisinopril')) return '/assets/Lisinopril.jpg';
    if (key.includes('albuterol')) return '/assets/Albuterol.jpg';
    if (key.includes('metformin')) return '/assets/Metformin.webp';

    return '/assets/Paracetamol.jpg';
  }
}
