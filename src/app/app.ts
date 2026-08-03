import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import your header component
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  // RouterOutlet = where pages load
  // Header = show header on every page
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
