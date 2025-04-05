import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter, tap } from 'rxjs';
import { msalInstance } from '../../msal/msalConfiguration';
import { getEnvMSALScopes } from '../helpers/envHelper';

@Component({
  selector: 'app-login',
  imports: [RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private routerService: Router
  ){
    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => 
        msg.eventType === EventType.LOGIN_SUCCESS || 
        msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || 
        msg.eventType === EventType.INITIALIZE_END 
      )    
    )
    .subscribe((result: EventMessage) => {
      if(result.eventType == EventType.INITIALIZE_END){
        const accounts = this.msalService.instance.getAllAccounts();
        if(accounts.length){
          this.routerService.navigate(['/home'])
          this.aquireTokenSilent(accounts[0]);
        }
      }
      else if(result.eventType == EventType.LOGIN_SUCCESS || result.eventType === EventType.ACQUIRE_TOKEN_SUCCESS){
        this.routerService.navigate(['/home'])
      }
    })
  }
  ngOnInit(): void {
   
  }

  public login(){
    this.msalService.loginRedirect();
  }

  public aquireTokenSilent(account: any){
    const scopes =  getEnvMSALScopes();
    this.msalService.acquireTokenSilent({
      scopes,
      account
    })
    .subscribe({
      next: (result: AuthenticationResult) => {
        this.routerService.navigate(['/home'])
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }
}
