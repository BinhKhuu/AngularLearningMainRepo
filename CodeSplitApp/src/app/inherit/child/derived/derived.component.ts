import { Component, input, InputSignalWithTransform } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-derived',
  standalone: true,
  imports: [],
  templateUrl: './derived.component.html',
  styleUrl: './derived.component.css',
  //inputs: ['sharedProperty']
})
export class DerivedComponent extends BaseComponent {
  override sharedProperty: InputSignalWithTransform<string, string | undefined> = input('', {transform: super.myTransform});

  constructor(){
    super();
  }

}
