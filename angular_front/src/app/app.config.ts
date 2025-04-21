import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Fix for ngModel support
import { provideHttpClient } from '@angular/common/http'; // ✅ Correct way to provide HTTP in standalone APIs

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(), // ✅ Fix for HttpClient injection error
    importProvidersFrom(FormsModule) // ✅ Fix for ngModel support
  ]
};
