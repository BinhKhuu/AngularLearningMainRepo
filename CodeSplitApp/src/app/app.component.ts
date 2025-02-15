import { CommonModule } from '@angular/common';
import { Component, Inject, Injectable, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  MsalService,
  MsalModule,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType,
} from '@azure/msal-browser';

import { filter } from 'rxjs';
import { HoverEffectDirective } from './directive/hover-effect.directive';
import { DerivedComponent } from './inherit/child/derived/derived.component';
import { CustomCardComponent } from './ContentProjection/custom-card/custom-card.component';

@Component({
  selector: '.app-root',
  imports: [MsalModule,
    RouterOutlet, 
    CommonModule, 
    HoverEffectDirective, 
    DerivedComponent,
    CustomCardComponent  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'codeSplitApp';
  showMainPage = true;
  volume = signal(0);
  //volume = 0;

  constructor(
    //@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private router: Router,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ){}
  parentProperty = 'pink';
  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd)=>{
        //this.hideMainPage = event.urlAfterRedirects.includes('/home');
        this.showMainPage = this.router.url.endsWith('/');
      })

      this.msalBroadcastService.msalSubject$
      .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.INITIALIZE_END)
      )
      .subscribe((result) => {
          if(result.eventType == EventType.INITIALIZE_END){
            const accounts = this.msalService.instance.getAllAccounts();
            if(accounts.length){
              console.log('already logged in', accounts)
              //this.loginSilent(accounts[0]);
              //this.login();
            }
          }
          else if(result.eventType == EventType.LOGIN_SUCCESS ){
            console.log('success', result);
            //this.router.navigate(['/home']);
          }
      });
  }

  naviageTo(page: string): void {
    this.router.navigate([page])
  }

  logout(): void {
    this.msalService.logout();
  }

  logIn(): void {
    this.msalService.loginRedirect();
  }

  prop2: string = 'test'
  changeParentProperty(): void {
    console.log('ugh', this.volume())
    this.volume.update(value => value + 10);
    //this.volume = this.volume + 10;
    this.parentProperty = this.parentProperty == 'pink' ?  'yellow' : 'pink';
    this.prop2 = this.parentProperty == 'pink' ?  'yellow' : 'pink';
  }

  modelValueOnChange(event: any): void {
    console.log('modelValueOnChange', event);
  }
}
