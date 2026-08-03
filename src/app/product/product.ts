import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input , Output , EventEmitter} from '@angular/core';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
//typescript class
export class ProductComponents {
  productName: string = 'Paracetamol';
  price: number = 2.5;
  quantity: number = 100;
  productImage: string = '/assets/paracetamol.jpg';
  isAvailable: boolean = true;
  constructor(public productService: ProductService) {}

  @Output()
  productPurchased = new EventEmitter<string>();

  buyProduct() {
    this.productPurchased.emit(this.productName);
  }
  @Input()
  pharmacy!: string;
  protected medicines: any;
}
