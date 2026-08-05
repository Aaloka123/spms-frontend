import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface HomeProductCard {
  id: number;
  name: string;
  price: string;
  image?: string | null;
  vendorName?: string;
  strength?: string;
  form?: string;
  quantity?: string;
}

@Component({
  selector: 'app-product-showcase',
  imports: [RouterLink],
  templateUrl: './product-showcase.html',
  styleUrl: './product-showcase.css',
})
export class ProductShowcase {
  @Input({ required: true }) title!: string;
  @Input() products: HomeProductCard[] = [];
  @Input() loading = false;
}
