import { Component, ElementRef, input } from '@angular/core';
import {ListBoxBaseComponent} from '../list-box-base/list-box-base.component';
@Component({
  selector: 'app-custom-list-box',
  imports: [],
  templateUrl: './custom-list-box.component.html',
  styleUrl: './custom-list-box.component.css',
  host:{
    '(click)': 'focusActiveOption($event)'
  }
})
export class CustomListBoxComponent extends ListBoxBaseComponent {
  disabled = input<boolean>(false);

  // constructor paramerets with the same name as the base parameters must override them or provide a different name
  constructor(
    private element: ElementRef
  ){
    super(element);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('child ng on init')
  }

  focusActiveOption() {
    console.log('handle focus event')
  }

}
