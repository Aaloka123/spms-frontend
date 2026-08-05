import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Guarantee } from './components/guarantee/guarantee';
import { TopProduct } from './components/top-product/top-product';
import { ProductSuggestion } from './components/product-suggestion/product-suggestion';
import { Faq } from './components/faq/faq';
import { NewArrivals } from './components/new-arrivals/new-arrivals';
import { Cta } from './components/cta/cta';

// Home page: hero, partners, products, FAQ, CTA
@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Guarantee,
    TopProduct,
    ProductSuggestion,
    Faq,
    NewArrivals,
    Cta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
