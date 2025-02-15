import { Component, model } from '@angular/core';

/*

  1. Use model in child, value bind the HTML input element add event to handle html input updates
  2. Two-way bind child property to parent
  3. don't need output in child angular will do this for you
  4. model input allows you to write to the property where input and output are read only
*/

@Component({
  selector: 'app-email-input',
  imports: [],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css'
})
export class EmailInputComponent {
  email = model('');

  constructor(){

  }

  onEmailChange(event: Event){
    const inputValue = (event.target as HTMLInputElement).value;
    this.email.set(inputValue);
  }
}
