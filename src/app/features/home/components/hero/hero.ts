import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Hero = top banner section on the home page (headline, CTA, stats, image)
@Component({
  selector: 'app-hero', // used in HTML as <app-hero />
  imports: [RouterLink], // lets the "View Products" button navigate without a full page reload
  templateUrl: './hero.html', // markup for this component
  styleUrl: './hero.css', // component styles (mostly Tailwind classes in the HTML)
})
export class Hero {
  // Stats shown at the bottom-left of the hero
  // Used in hero.html with @for to render each item
  stats = [
    { value: '24/7', label: 'Emergency Service' },
    { value: '50+', label: 'Pharmacy' },
    { value: '100k+', label: 'Happy Patient' },
  ];
}
