import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Guarantee } from './components/guarantee/guarantee';

// Home page: hero banner + partner pharmacies section
@Component({
  selector: 'app-home',
  imports: [Hero, Guarantee],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
