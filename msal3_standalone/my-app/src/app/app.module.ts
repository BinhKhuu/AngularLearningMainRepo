import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MsalRedirectComponent as Redirect } from './msal-redirect/msal-redirect.component';
import { authInterceptor } from './auth.interceptor';
import { AuthClassInterceptor } from './authClass.interceptor';
import { environment } from '../environments/environment';

export function MSALConfiguration(){
  const msalInstance  = new PublicClientApplication({ // MSAL Configuration
    auth: {
        clientId: "1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d",
        authority: "https://login.microsoftonline.com/fb2492a7-4cfe-4506-95f9-2284aa380e41",
        redirectUri: "http://localhost:4200/home",
        postLogoutRedirectUri: "http://localhost:4200"
    },
    cache: {
        cacheLocation : BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false, // set to true for IE 11
    },
    system: {
        loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false
        }
    }
  });

  return msalInstance;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Redirect
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot( MSALConfiguration(), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
  }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        //['https://graph.microsoft.com/v1.0/me', ['user.read']],
        //['https://api.myapplication.com/users/*', ['customscope.read']],
        // this will tell MSALInterceptor to add the access token for each request to localhost:4200
        //['http://localhost:4200/*', ['api://1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d/user.access']] 
        ['http://localhost:4200/*', environment.scopes]
      ])
    })
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthClassInterceptor,
      multi: true
    },
    // provideHttpClient(
    //   withInterceptors([authInterceptor]))
    // ,
    MsalService,
    MsalGuard,
    MsalBroadcastService 
   ],
   // boostrap the MsalRedirectComponent, this is loaded to <app-redirect> in the main.html
  bootstrap: [AppComponent, Redirect]
})
export class AppModule { }
