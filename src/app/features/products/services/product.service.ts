import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';

/** Matches backend ProductRequestDTO */
export interface ProductRequest {
  productName: string;
  genericName: string;
  brand: string;
  dosageForm: string;
  strength: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  expiryDate: string; // YYYY-MM-DD
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductFeatureService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = `${environment.apiBaseUrl}/products`;

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getNewArrivals(limit = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/new-arrivals`, {
      params: { limit },
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  /** ADMIN — active + inactive */
  getAllProductsForAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/admin/all`);
  }

  createProduct(body: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, body);
  }

  updateProduct(id: number, body: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${id}`, body);
  }

  /** Soft delete (isActive = false) */
  deleteProduct(id: number): Observable<string> {
    return this.http.delete(`${this.productsUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
