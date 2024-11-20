import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { routes } from './app.routes';  // Rutas de tu aplicación

export const appConfig = {
  providers: [
    provideHttpClient(),    // Configuración para usar HttpClient
    provideRouter(routes)   // Rutas de la aplicación
  ]
};
