import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { environment } from '../environments/environment';
@Injectable()
export class AuthClassInterceptor implements HttpInterceptor {
    constructor(
        private msalService: MsalService
    ){

    }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('2 intercept 2')
    const account = this.msalService.instance.getAllAccounts()[0];
    if(account) {
      console.log('scopes are', environment.scopes.toString())
      return this.msalService.acquireTokenSilent({
        scopes:environment.scopes,
        account
      })
      .pipe(
        switchMap((result: AuthenticationResult) =>{
          console.log('intercept auth token 2')
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${result.accessToken}`          }
          });
          return next.handle(authReq);
        }),
        // catchError((error) => {
        //   // catch error will run when the return fails
        //   console.log('intercept token failed', error);
        //   return next(req);
        // })
      );
    }

    return next.handle(req);
  }
}
