import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes'; // Import application routes

// Global application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    // Configures Angular's change detection for better performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Registers the application's routing configuration
    provideRouter(routes),

    // Registers HttpClient so it can be injected into services/components
    provideHttpClient(),
  ],
};
