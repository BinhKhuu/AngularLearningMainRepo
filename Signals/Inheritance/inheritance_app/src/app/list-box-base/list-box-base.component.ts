import { Component, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-list-box-base',
  imports: [],
  templateUrl: './list-box-base.component.html',
  styleUrl: './list-box-base.component.css',
  host:{
    '(keydown)': 'handleKey($event)'
  }
})
export class ListBoxBaseComponent {
  value = input<string>('');
  protected isInitialized = false;

  constructor(
    private elementRef: ElementRef
  ){

  }

  ngOnInit() {
    this.isInitialized = true;
    console.log('base ngOnInit')
  }

  handleKey(event: KeyboardEvent){
    console.log('handing keydown event')
  }

}
