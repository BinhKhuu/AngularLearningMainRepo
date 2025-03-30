import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalModule, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MsalModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-routing-app';
  clientId = import.meta.env["NG_APP_ClientId"];

  constructor(
    private router: Router,
    private msalService: MsalService
  ) {
    this.msalService.handleRedirectObservable();

  }
  ngOnInit(): void {
  }

  

}
