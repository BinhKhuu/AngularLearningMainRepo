import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MsalModule, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { msalInstance, msalGuardConfig, msalInterceptorConfig } from './msal3.config';
import { InteractionType } from '@azure/msal-browser';
import { HoverEffectDirective } from './directive/hover-effect.directive';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      MsalModule.forRoot(msalInstance, msalGuardConfig,msalInterceptorConfig )
    ),
    MsalService,
    MsalBroadcastService,
    HoverEffectDirective
  ],
};
