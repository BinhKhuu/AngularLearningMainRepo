import { Component } from '@angular/core';
import { InnerItemComponent } from "../inner-item/inner-item.component";

@Component({
  selector: 'app-outer-container',
  imports: [InnerItemComponent],
  templateUrl: './outer-container.component.html',
  styleUrl: './outer-container.component.css'
})
export class OuterContainerComponent {

}
