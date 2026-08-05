import { Component } from '@angular/core';
import { HomeProductCard, ProductShowcase } from '../product-showcase/product-showcase';

@Component({
  selector: 'app-new-arrivals',
  imports: [ProductShowcase],
  templateUrl: './new-arrivals.html',
  styleUrl: './new-arrivals.css',
})
export class NewArrivals {
  // Mock data for now (replace with ProductService later)
  products: HomeProductCard[] = [
    {
      id: 9,
      name: 'Lisinopril',
      price: 'Rs 7.90',
      image: '/assets/Lisinopril.jpg',
      vendorName: 'MediCare Hub',
      strength: '20mg',
      form: 'Tablet',
      quantity: '60',
    },
    {
      id: 10,
      name: 'Albuterol',
      price: 'Rs 3.75',
      image: '/assets/Albuterol.jpg',
      vendorName: 'Wellness Mart',
      strength: '100mcg',
      form: 'Inhaler',
      quantity: '1',
    },
    {
      id: 11,
      name: 'Paracetamol',
      price: 'Rs 2.00',
      image: '/assets/Paracetamol.jpg',
      vendorName: 'Aaloka Pharmacy',
      strength: '500mg',
      form: 'Tablet',
      quantity: '100',
    },
    {
      id: 12,
      name: 'Brufin',
      price: 'Rs 4.50',
      image: '/assets/Brufin.jpg',
      vendorName: 'HealthPlus',
      strength: '200mg',
      form: 'Tablet',
      quantity: '50',
    },
  ];
}
