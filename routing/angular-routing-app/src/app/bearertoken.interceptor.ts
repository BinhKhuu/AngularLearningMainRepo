import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';

export const bearertokenInterceptor: HttpInterceptorFn = (req, next) => {
  return from(aquireTokenSilent())
  .pipe(
    switchMap((authResult: AuthenticationResult) =>{
      console.log('adding bearer')
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authResult.accessToken}`         
        }
      });
      return next(authReq);
    }),
    catchError((err: any) => {
      console.log(err);
      return throwError(() => err);
    })
  );
};

const aquireTokenSilent = (): Promise<AuthenticationResult> => {
  const msalService = Inject(MsalService);
  const accounts = msalService.instance.getAllAccounts();
  if(accounts && accounts.length > 0){
    const scopes = [
      import.meta.env['NG_APP_Scope1'],
      import.meta.env['NG_APP_Scope2']
    ];
    // assuming first account
    const account = accounts[0];
    return msalService.acquireTokenSilent({
      scopes,
      account
    })
  }
  else {
    return Promise.reject(new Error("No accounts found for token acquisition."));
  }
}
