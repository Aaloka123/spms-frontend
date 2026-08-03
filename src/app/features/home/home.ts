import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-home',
  imports: [Hero],          // register Hero here
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
