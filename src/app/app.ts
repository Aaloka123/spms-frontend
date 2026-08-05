import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Copyright } from './features/home/components/copyright/copyright';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Copyright],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
