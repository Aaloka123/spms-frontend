import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ProductFeatureService,
  ProductRequest,
} from '../../products/services/product.service';
import { Product } from '../../products/models/product.model';

@Component({
  selector: 'app-admin-products',
  imports: [FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  private readonly productService = inject(ProductFeatureService);

  allProducts: Product[] = [];
  products: Product[] = [];
  searchText = '';
  loading = true;
  errorMessage = '';
  saving = false;
  formError = '';

  showForm = false;
  editingId: number | null = null;
  form: ProductRequest = this.emptyForm();

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAllProductsForAdmin().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.applySearch();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.allProducts = [];
        this.products = [];
        this.errorMessage =
          err.status === 401 || err.status === 403
            ? 'Login as ADMIN to manage products.'
            : 'Could not load products. Is the backend running?';
      },
    });
  }

  onSearch(): void {
    this.applySearch();
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.emptyForm();
    this.formError = '';
    this.showForm = true;
  }

  openEdit(product: Product): void {
    this.editingId = product.id;
    this.form = {
      productName: product.productName,
      genericName: product.genericName ?? '',
      brand: product.brand ?? '',
      dosageForm: product.dosageForm ?? '',
      strength: product.strength ?? '',
      purchasePrice: Number(product.purchasePrice ?? 0),
      sellingPrice: Number(product.sellingPrice),
      stockQuantity: Number(product.stockQuantity),
      reorderLevel: Number(product.reorderLevel ?? 0),
      expiryDate: (product.expiryDate ?? '').slice(0, 10),
      description: product.description ?? '',
    };
    this.formError = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.formError = '';
  }

  saveProduct(): void {
    if (!this.form.productName.trim() || !this.form.expiryDate) {
      this.formError = 'Fill required fields. Expiry must be a future date.';
      return;
    }

    this.saving = true;
    this.formError = '';

    const body: ProductRequest = {
      ...this.form,
      productName: this.form.productName.trim(),
      genericName: this.form.genericName.trim(),
      brand: this.form.brand.trim(),
      dosageForm: this.form.dosageForm.trim(),
      strength: this.form.strength.trim(),
      description: this.form.description?.trim() || undefined,
    };

    const req$ =
      this.editingId == null
        ? this.productService.createProduct(body)
        : this.productService.updateProduct(this.editingId, body);

    req$.subscribe({
      next: () => {
        this.saving = false;
        this.closeForm();
        this.loadProducts();
      },
      error: (err) => {
        this.saving = false;
        this.formError =
          err?.error?.detail ||
          err?.error?.title ||
          'Save failed. Check fields (expiry must be in the future).';
      },
    });
  }

  deleteProduct(product: Product): void {
    if (!confirm(`Deactivate "${product.productName}"?`)) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => this.loadProducts(),
      error: () => alert('Delete failed.'),
    });
  }

  formatPrice(value: number | undefined): string {
    return Number(value ?? 0).toLocaleString();
  }

  formatExpiry(expiryDate?: string): string {
    if (!expiryDate) return '—';
    const d = new Date(expiryDate);
    return Number.isNaN(d.getTime()) ? expiryDate : d.toLocaleDateString();
  }

  isExpired(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const d = new Date(expiryDate);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  }

  private applySearch(): void {
    const q = this.searchText.trim().toLowerCase();
    if (!q) {
      this.products = this.allProducts;
      return;
    }
    this.products = this.allProducts.filter((p) =>
      [p.productName, p.genericName ?? '', p.brand ?? '', p.dosageForm ?? '', p.description ?? '']
        .some((v) => v.toLowerCase().includes(q)),
    );
  }

  private emptyForm(): ProductRequest {
    return {
      productName: '',
      genericName: '',
      brand: '',
      dosageForm: '',
      strength: '',
      purchasePrice: 0,
      sellingPrice: 0,
      stockQuantity: 0,
      reorderLevel: 0,
      expiryDate: '',
      description: '',
    };
  }
}
