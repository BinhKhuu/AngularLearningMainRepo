import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private http: HttpClient,
    private router: Router
  ){


    
  }

  ngOnInit(){

    // this.msalBroadcastService.msalSubject$
    // .pipe(
    //     //tap((msg: EventMessage) => console.log('ugh message', msg)),
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || msg.eventType === EventType.INITIALIZE_END)
    // )
    // .subscribe((result) => {
    //     if(result.eventType == EventType.INITIALIZE_END){
    //       const accounts = this.msalService.instance.getAllAccounts();
    //       if(accounts.length){
    //         console.log('already logged in', accounts)
    //         this.loginSilent(accounts[0]);
    //         //this.login();
    //       }
    //     }
    //     else if(result.eventType == EventType.LOGIN_SUCCESS || result.eventType === EventType.ACQUIRE_TOKEN_SUCCESS){
    //       console.log('success', result)
    //     }
    // });



    //this.msalService.instance.addEventCallback((event) => {
      //console.log('test test ',event)
    //})

    // this.msalBroadcastService.inProgress$
    // .pipe(
    //     //tap((status: InteractionStatus) => console.log(status,'progress')),
    //     filter((status: InteractionStatus) => status === InteractionStatus.None)
    // )
    // .subscribe(async () => {

    // })
  }

  private readonly _destroying$ = new Subject<void>();

  ngOnDestroy(): void {
    console.log('destroy')
    this._destroying$.next();
    this._destroying$.complete();
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
      },
      error: (error) => {
        console.log('error', error)
      }
    });
  }

  public testApi(){
    console.log('testing')
    return this.http.get("http://localhost:4200").subscribe()
  }

  public gotoFeature(){
    this.router.navigate(['/test'])
  }

}
