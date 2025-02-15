import { Component, contentChild, EventEmitter, input, InputSignalWithTransform, Output, signal, Signal } from '@angular/core';
import { UsernameInputToken } from '../Models/username-input.token';
/*
  1. value bind html input value to input property
  2. two-way bind with parent on childs input property
  3. create the @Output event for the childs input property
  4. add event on childs html input to handle changes and emit to parent
  5. parents value will receive updates from child changes
*/
@Component({
  selector: 'app-username-input',
  imports: [],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.css',
  host: {
    '[class.active]': 'isActive'
  },
  providers: [{provide: UsernameInputToken, useExisting: UsernameInputComponent}]
})

// this is the 'child' component
export class UsernameInputComponent implements UsernameInputToken{
  // using two way binding with input and @Output
  // transform function is called after emit but will propogate to the parent
  public username = input.required({transform: this.transformUsername});
  public isActive = true;
  // the output name must be propertynameChange
  @Output() usernameChange = new EventEmitter<string>();
  projectedChildComponent = contentChild('projectedElement',{descendants: true});
  public test = signal<number>(0);
  constructor(){
    this.test.as
  }

  transformUsername(username: string): string{
    console.log('transofrming', username);
    return username.trim() +' ugh ';
  }

  // this is needed to update the value on the child (username-input) and relay it to the parent
  // where the parent binding is [(username)]
  onInputChange(event:Event){
    const inputValue = (event.target as HTMLInputElement).value;
    this.usernameChange.emit(inputValue);
    this.isActive = !this.isActive;

    console.log('projected element ref', this.projectedChildComponent())

  }


}
