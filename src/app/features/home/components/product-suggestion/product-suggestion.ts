import { Component, OnInit, inject } from '@angular/core';
import { HomeProductCard, ProductShowcase } from '../product-showcase/product-showcase';
import { ProductFeatureService } from '../../../products/services/product.service';
import { mapProductToCard } from '../../mapper/product.mapper';

@Component({
  selector: 'app-product-suggestion',
  imports: [ProductShowcase],
  templateUrl: './product-suggestion.html',
  styleUrl: './product-suggestion.css',
})
export class ProductSuggestion implements OnInit {
  private readonly productService = inject(ProductFeatureService);

  products: HomeProductCard[] = [];
  loading = true;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = [...data]
          .sort((a, b) => b.stockQuantity - a.stockQuantity)
          .slice(0, 4)
          .map(mapProductToCard);
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      },
    });
  }
}