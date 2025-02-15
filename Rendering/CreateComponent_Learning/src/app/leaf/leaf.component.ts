import { Component, input } from '@angular/core';

@Component({
  selector: 'app-leaf',
  imports: [],
  templateUrl: './leaf.component.html',
  styleUrl: './leaf.component.css'
})
export class LeafComponent {
  data = input<string>('');
}
