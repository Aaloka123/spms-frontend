import { Component, OnInit, inject } from '@angular/core';
import { HomeProductCard, ProductShowcase } from '../product-showcase/product-showcase';
import { ProductFeatureService } from '../../../products/services/product.service';
import { mapProductToCard } from '../../mapper/product.mapper';

@Component({
  selector: 'app-new-arrivals',
  imports: [ProductShowcase],
  templateUrl: './new-arrivals.html',
  styleUrl: './new-arrivals.css',
})
export class NewArrivals implements OnInit {
  private readonly productService = inject(ProductFeatureService);

  products: HomeProductCard[] = [];
  loading = true;

  ngOnInit(): void {
    this.productService.getNewArrivals(4).subscribe({
      next: (data) => {
        this.products = data.map(mapProductToCard);
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      },
    });
  }
}