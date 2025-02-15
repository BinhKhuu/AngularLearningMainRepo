import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-msal-redirect',
  standalone: false,
  
  templateUrl: './msal-redirect.component.html',
  styleUrl: './msal-redirect.component.css'
})
export class MsalRedirectComponent {
  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) { }
  
  ngOnInit(): void {    
      this.msalService.handleRedirectObservable().subscribe({
        next: (status) =>{
          console.log('custom redirect component: ', status)
        },
        error: (error) =>{
          console.log('customer redirect component error: ', error)
        }
      });

      this.msalBroadcastService.msalSubject$
      .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.INITIALIZE_END)
      )
      .subscribe((result) => {
          if(result.eventType == EventType.INITIALIZE_END){
            const accounts = this.msalService.instance.getAllAccounts();
            if(accounts.length){
              console.log('already logged in', accounts)
              this.loginSilent(accounts[0]);
              //this.login();
            }
          }
          else if(result.eventType == EventType.LOGIN_SUCCESS ){
            console.log('success', result);
            //this.router.navigate(['/home']);
          }
      });
  }


  public login(){
    this.msalService.loginRedirect({
      scopes:['api://1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d/user.access','api://1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d/Files.Read']
    });
  }

  public loginSilent(account: any){
    this.msalService.acquireTokenSilent({
      scopes:['api://1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d/user.access','api://1f92f546-9fa1-4e51-b2a5-25fadb5b5d1d/Files.Read'],
      account
    
    })
    .subscribe({
      next: (result: AuthenticationResult) => {
        console.log('access token accquired', result.accessToken)
        //this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }
}
