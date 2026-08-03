import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',              // <app-hero />
  imports: [RouterLink],             // for "View Products" link
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  // same stats array as React
  stats = [
    { value: '24/7', label: 'Emergency Service' },
    { value: '50+', label: 'Pharmacy' },
    { value: '100k+', label: 'Happy Patient' },
  ];
}
