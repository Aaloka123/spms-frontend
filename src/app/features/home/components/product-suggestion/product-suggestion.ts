import { Component } from '@angular/core';
import { HomeProductCard, ProductShowcase } from '../product-showcase/product-showcase';

@Component({
  selector: 'app-product-suggestion',
  imports: [ProductShowcase],
  templateUrl: './product-suggestion.html',
  styleUrl: './product-suggestion.css',
})
export class ProductSuggestion {
  // Mock data for now (replace with ProductService later)
  products: HomeProductCard[] = [
    {
      id: 5,
      name: 'Albuterol',
      price: 'Rs 5.50',
      image: '/assets/Albuterol.jpg',
      vendorName: 'Wellness Mart',
      strength: '100mcg',
      form: 'Inhaler',
      quantity: '1',
    },
    {
      id: 6,
      name: 'Paracetamol',
      price: 'Rs 2.10',
      image: '/assets/Paracetamol.jpg',
      vendorName: 'Aaloka Pharmacy',
      strength: '500mg',
      form: 'Tablet',
      quantity: '24',
    },
    {
      id: 7,
      name: 'Brufin',
      price: 'Rs 6.00',
      image: '/assets/Brufin.jpg',
      vendorName: 'HealthPlus',
      strength: '400mg',
      form: 'Tablet',
      quantity: '30',
    },
    {
      id: 8,
      name: 'Metformin',
      price: 'Rs 3.40',
      image: '/assets/Metformin.webp',
      vendorName: 'City Drugs',
      strength: '850mg',
      form: 'Tablet',
      quantity: '16',
    },
  ];
}
