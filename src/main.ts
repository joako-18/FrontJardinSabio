import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeoutInterceptor } from './app/interceptor/timeout.interceptor'; // Asegúrate de importar tu interceptor
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // Asegúrate de importar tu interceptor

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,  // Mantén el resto de configuraciones que tienes en appConfig

    // Configura HttpClient con fetch
    provideHttpClient(withFetch()),

    // Registra el interceptor usando HTTP_INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeoutInterceptor,
      multi: true
    }
  ]
})
  .catch((err) => console.error('Error during app initialization:', err));
