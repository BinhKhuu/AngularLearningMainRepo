import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { MsalBroadcastService, MsalModule, MsalService } from '@azure/msal-angular';
import { msalGuardConfig, msalInstance, msalInterceptorConfig } from '../msal/msalConfiguration';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      MsalModule.forRoot(msalInstance, msalGuardConfig, msalInterceptorConfig)
    ) 
   ]
};
