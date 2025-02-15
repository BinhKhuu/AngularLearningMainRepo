import { ApplicationRef, ChangeDetectorRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { MyPopupComponent } from './my-popup/my-popup.component';
import {NgElement, WithProperties} from '@angular/elements';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private injector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private cdr: ChangeDetectorRef
  ) { }

  showAsComponent(message: string){

    // the element container for the dynamic element
    const popup = document.createElement('div');

    // the angular dynamic element
    const popupComponentRef = createComponent(MyPopupComponent, {
      environmentInjector: this.injector,
      hostElement: popup
    });

    // Attach the dynamically created component to angulars change detection system.
    this.applicationRef.attachView(popupComponentRef.hostView);
    popupComponentRef.instance.message = 'message';
    // Listen to the close event emitter from MyPopupComponent
    popupComponentRef.instance.closed.subscribe(() =>{
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });
    // attach to dom
    document.body.appendChild(popup);
  }

  showAsElement(message: string){

    // create custom element note the name of the element is different from the the component selector
    // this is coming from the root app component and is named differently to avoid strange behavior
    // when the global name is the same as the component selector
    const popupE1: NgElement & WithProperties<MyPopupComponent> = document.createElement(
      'popup-element'
    ) as any;

    // listen for closed event from  MyPopupComponent Output event emitter
    popupE1.addEventListener('closed', () => document.body.removeChild(popupE1));

    popupE1.message = message;

    document.body.appendChild(popupE1);
  }
}
