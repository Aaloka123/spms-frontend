import { Component } from '@angular/core';
// needed for routerLink / active link styles
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',                 // use as <app-footer />
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // later: connect to AuthService
  // for now always show "Become a vendor"
  isLoggedIn = false;
}
