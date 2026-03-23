import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEsCo from '@angular/common/locales/es-CO';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeEsCo); // Registramos el locale para español de Colombia

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Proporciona el servicio HttpClient para toda la aplicación
    provideAnimationsAsync(), // Proporciona soporte para animaciones de forma asíncrona
    { provide: LOCALE_ID, useValue: 'es-CO' } // Establecemos el locale predeterminado para toda la aplicación
  ]
};
