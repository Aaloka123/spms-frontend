import { Component } from '@angular/core';
import { ProductComponents } from '../product/product';

@Component({
  selector: 'app-dashboard',
  imports: [ProductComponents],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
pharmacyName = "Aaloka Pharmacy "
lastPurchasedMedicine: string="None";


onProductPurchased(medicine: string){
  this.lastPurchasedMedicine=medicine;
}


}
