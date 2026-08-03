import { Component } from '@angular/core';
// RouterLink = navigate with <a routerLink="...">
// RouterLinkActive = add CSS class when that route is active
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',              // use as <app-header /> in HTML
  imports: [RouterLink, RouterLinkActive], // standalone: bring in router helpers
  templateUrl: './header.html',        // view file
  styleUrl: './header.css',            // styles file
})
export class Header {
  // controls mobile side menu open/close
  menuOpen = false;

  // hamburger button calls this
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // close menu after clicking a link / backdrop
  closeMenu(): void {
    this.menuOpen = false;
  }
}
