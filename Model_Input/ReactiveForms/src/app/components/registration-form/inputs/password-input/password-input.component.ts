import { Component, input, output } from '@angular/core';
/*
  1. value bind html input value to input property
  2. two-way bind with parent on childs input property
  3. create the output event for the childs input property, MUST be named propertyChange e.g. passwordChange
  4. add event on childs html input to handle changes and emit to parent
  5. parents value will receive updates from child changes, will apply the transform
*/
@Component({
  selector: 'app-password-input',
  imports: [],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
  password = input.required({transform: this.passwordTransform});
  passwordChange = output<string>();
  constructor(){

  }

  passwordTransform(value: string): string{
    console.log('triming password ', value)
    return value.trim();
  }

  passwordInputOnChange(event: Event){
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('password changed', inputValue);
    this.passwordChange.emit(inputValue);
  }
}
