import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductFeatureService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AuthService } from '../../../../core/services/auth.service';

const ALL_CATEGORY = 'All Medications';

type CatalogProduct = {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  strength: string;
  form: string;
  quantity: string;
  price: number;
  stock: number;
  stockLabel: string;
  stockTone: string;
  image: string;
};

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly productService = inject(ProductFeatureService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private allProducts: CatalogProduct[] = [];

  categories: string[] = [ALL_CATEGORY];
  filteredProducts: CatalogProduct[] = [];

  selectedCategory = ALL_CATEGORY;
  sortBy = 'default';
  loading = true;
  errorMessage = '';
  addingProductId: number | null = null;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data.map((p) => this.mapProduct(p));
        this.categories = [
          ALL_CATEGORY,
          ...Array.from(new Set(this.allProducts.map((p) => p.category))).sort(),
        ];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.allProducts = [];
        this.filteredProducts = [];
        this.loading = false;
        this.errorMessage = 'Could not load products. Is the backend running?';
      },
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  openProduct(productId: number): void {
    void this.router.navigate(['/products', productId]);
  }

  onAddToCart(event: Event, product: CatalogProduct): void {
    event.stopPropagation();

    if (product.stock <= 0) return;

    if (!this.authService.isLoggedIn()) {
      void this.router.navigate(['/login'], { queryParams: { returnUrl: '/products' } });
      return;
    }

    // Cart API not wired yet — keep button in the UI for the React-style design.
    this.addingProductId = product.id;
    window.setTimeout(() => {
      this.addingProductId = null;
      alert('Cart is coming soon. Product selected: ' + product.name);
    }, 400);
  }

  private applyFilters(): void {
    let list = this.allProducts.filter(
      (p) => this.selectedCategory === ALL_CATEGORY || p.category === this.selectedCategory,
    );

    list = [...list];
    if (this.sortBy === 'price-low-high') list.sort((a, b) => a.price - b.price);
    if (this.sortBy === 'price-high-low') list.sort((a, b) => b.price - a.price);
    if (this.sortBy === 'name-a-z') list.sort((a, b) => a.name.localeCompare(b.name));

    this.filteredProducts = list;
  }

  private mapProduct(dto: Product): CatalogProduct {
    const stock = dto.stockQuantity ?? 0;
    const stockUi = this.stockDisplay(stock);
    const form = dto.dosageForm?.trim() || '—';
    // Backend has no category yet — group chips by dosage form for now.
    const category = form !== '—' ? form : 'General';

    return {
      id: dto.id,
      name: dto.productName,
      category,
      subtitle: [dto.brand || dto.genericName, form].filter(Boolean).join(' · '),
      strength: this.formatStrength(dto.strength),
      form,
      quantity: String(stock),
      price: Number(dto.sellingPrice),
      stock,
      stockLabel: stockUi.stockLabel,
      stockTone: stockUi.stockTone,
      image: this.getImage(dto),
    };
  }

  private stockDisplay(stock: number): { stockLabel: string; stockTone: string } {
    if (stock <= 0) {
      return { stockLabel: 'Out of Stock', stockTone: 'bg-slate-100 text-slate-600' };
    }
    if (stock <= 10) {
      return { stockLabel: 'Low Stock', stockTone: 'bg-rose-100 text-rose-700' };
    }
    return { stockLabel: 'In Stock', stockTone: 'bg-emerald-100 text-emerald-700' };
  }

  private formatStrength(strength: string | null | undefined): string {
    const trimmed = (strength ?? '').trim();
    if (!trimmed) return '—';
    if (/[a-zA-Z%]/.test(trimmed)) return trimmed;
    if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}mg`;
    return trimmed;
  }

  private getImage(product: Product): string {
    const key = `${product.productName} ${product.genericName ?? ''}`.toLowerCase();

    if (key.includes('paracetamol') || key.includes('acetaminophen')) return '/assets/Paracetamol.jpg';
    if (key.includes('brufin') || key.includes('ibuprofen')) return '/assets/Brufin.jpg';
    if (key.includes('lisinopril')) return '/assets/Lisinopril.jpg';
    if (key.includes('albuterol')) return '/assets/Albuterol.jpg';
    if (key.includes('metformin')) return '/assets/Metformin.webp';

    return '/assets/Paracetamol.jpg';
  }
}
