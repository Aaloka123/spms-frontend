import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  medicines = [
    {
      name: 'Paracetamol',
      price: 2.5,
      quantity: 100,
    },

    {
      name: 'Ibuprofen',
      price: 3.2,
      quantity: 0,
    },

    {
      name: 'Aspirin',
      price: 1.8,
      quantity: 10,
    },
  ];
}
