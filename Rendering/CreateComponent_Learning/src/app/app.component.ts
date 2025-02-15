import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OuterContainerComponent } from "./outer-container/outer-container.component";
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OuterContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CreateComponent_Learning';
  constructor(private injector: Injector){
    const myCustomElement = createCustomElement(OuterContainerComponent,{injector});
    window.customElements.define('app-my-custom-element', myCustomElement);

    // now you can use the custom element like this
    // document.body.innerHTML = '<app-my-custom-element></app-my-custom-element>'
  }
}
