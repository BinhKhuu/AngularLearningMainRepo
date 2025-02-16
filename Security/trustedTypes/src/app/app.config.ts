import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// for now the typings for trusted types are not working for this example
declare global {
  interface TrustedTypePolicy {
    createHTML(value: string): TrustedHTML;
    createScript(value: string): TrustedScript;
    createScriptURL(value: string): TrustedScriptURL;
  }

  interface TrustedHTML {}
  interface TrustedScript {}
  interface TrustedScriptURL {}

  interface TrustedTypePolicyFactory {
    createPolicy(policyName: string, policyOptions: { createHTML?: (value: string) => string; createScript?: (value: string) => string; createScriptURL?: (value: string) => string }): TrustedTypePolicy;
  }

  interface Window {
    trustedTypes?: TrustedTypePolicyFactory;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
