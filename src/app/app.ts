import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Copyright } from './features/home/components/copyright/copyright';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Copyright],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  isAdminRoute = false;

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
      });
  }
}
