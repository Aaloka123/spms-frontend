import { Component } from '@angular/core';
import { HomeProductCard, ProductShowcase } from '../product-showcase/product-showcase';

@Component({
  selector: 'app-top-product',
  imports: [ProductShowcase],
  templateUrl: './top-product.html',
  styleUrl: './top-product.css',
})
export class TopProduct {
  // Mock data for now (replace with ProductService later)
  products: HomeProductCard[] = [
    {
      id: 1,
      name: 'Paracetamol',
      price: 'Rs 2.50',
      image: '/assets/Paracetamol.jpg',
      vendorName: 'Aaloka Pharmacy',
      strength: '500mg',
      form: 'Tablet',
      quantity: '100',
    },
    {
      id: 2,
      name: 'Brufin',
      price: 'Rs 3.20',
      image: '/assets/Brufin.jpg',
      vendorName: 'HealthPlus',
      strength: '200mg',
      form: 'Tablet',
      quantity: '50',
    },
    {
      id: 3,
      name: 'Lisinopril',
      price: 'Rs 1.80',
      image: '/assets/Lisinopril.jpg',
      vendorName: 'MediCare Hub',
      strength: '10mg',
      form: 'Tablet',
      quantity: '28',
    },
    {
      id: 4,
      name: 'Metformin',
      price: 'Rs 4.00',
      image: '/assets/Metformin.webp',
      vendorName: 'City Drugs',
      strength: '500mg',
      form: 'Tablet',
      quantity: '60',
    },
  ];
}
