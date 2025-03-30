import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
export const msalGuardConfig: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect,
};
export const msalInstance = new PublicClientApplication({
    auth: {
        clientId: import.meta.env['NG_APP_ClientId'],
        authority: import.meta.env['NG_APP_Authority'],
        redirectUri: import.meta.env['NG_APP_RedirectUri'],
        postLogoutRedirectUri: import.meta.env['NG_APP_PostLogoutRedirectUri']
    },
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false,
        },
    },
});

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([])
}