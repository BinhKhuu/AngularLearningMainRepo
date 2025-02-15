import { Component, ViewContainerRef } from '@angular/core';
import { LeafComponent } from '../leaf/leaf.component';
import { createCustomElement } from '@angular/elements';
import { OuterContainerComponent } from '../outer-container/outer-container.component';

@Component({
  selector: 'app-inner-item',
  imports: [],
  templateUrl: './inner-item.component.html',
  styleUrl: './inner-item.component.css'
})
export class InnerItemComponent {
  constructor(private viewContainer: ViewContainerRef) {}
  loadContent() {
    const component = this.viewContainer.createComponent(LeafComponent);
    component.setInput('data', 'ugh');
  }
}
