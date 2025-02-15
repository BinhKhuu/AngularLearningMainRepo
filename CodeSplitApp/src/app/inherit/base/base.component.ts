import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  sharedProperty = input('', {transform: this.myTransform});

  public myTransform(value: string | undefined): string {
    console.log('transforming', value);
    return `${value} transformed`;
  }
}
