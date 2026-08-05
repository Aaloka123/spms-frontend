import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductFeatureService {
  private readonly http = inject(HttpClient);

  // http://localhost:8080/api/products
  private readonly productsUrl = `${environment.apiBaseUrl}/products`;

  // GET all active products (Home: Top Products / Suggestions)
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // GET newest products (Home: New Arrivals)
  getNewArrivals(limit = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/new-arrivals`, {
      params: { limit },
    });
  }

  // GET one product by id (optional for later detail page)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }
}
