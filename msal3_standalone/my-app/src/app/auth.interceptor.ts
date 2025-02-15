import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { catchError, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const msalService = inject(MsalService);
  console.log('intercept')
  const account = msalService.instance.getAllAccounts()[0];
  if(account) {
    console.log('scopes are: ',environment.scopes.toString())
    return msalService.acquireTokenSilent({
      scopes:environment.scopes,
      account
    })
    .pipe(
      switchMap((result: AuthenticationResult) =>{
        console.log('intercept auth token')
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${result.accessToken}`          }
        });
        return next(authReq);
      }),
      // catchError((error) => {
      //   // catch error will run when the return fails
      //   console.log('intercept token failed', error);
      //   return next(req);
      // })
    );
  }

  // no access token dont attach auth header
  console.log('ugh here')
  return next(req);
};

