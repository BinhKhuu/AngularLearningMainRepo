import { Component, computed, OnInit, Signal } from '@angular/core';
import { CounterService } from '../../services/signals/counter.service';

@Component({
  selector: 'app-panel1',
  imports: [],
  templateUrl: './panel1.component.html',
  styleUrl: './panel1.component.css',
})
export class Panel1Component implements OnInit{
  counterValue: number;
  constructor(
    public counterService: CounterService //using the root service if you import one locally a new copy is made for this component and its children
  ){
    this.counterValue = this.counterService.counter();
  }
  ngOnInit(): void {
    
  }
}
