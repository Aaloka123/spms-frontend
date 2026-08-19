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
