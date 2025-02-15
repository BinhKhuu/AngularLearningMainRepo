import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyPopupComponent } from "./my-popup/my-popup.component";
import { PopupService } from './popup.service';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[PopupService]
})
export class AppComponent {
  

  constructor(
    injector: Injector,
    public popup: PopupService
  ){


    const popupElement = createCustomElement(MyPopupComponent, {injector});
    // note the define is custom element selector is named differently from the component selector in MyPopupComponent
    // if we use app-my-popup it will cause strange issues
    customElements.define('popup-element', popupElement);
  }
}
