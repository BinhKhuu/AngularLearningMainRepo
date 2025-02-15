import { Component, effect, OnInit, Signal } from '@angular/core';
import { CounterService } from '../../services/signals/counter.service';

@Component({
  selector: 'app-panel2',
  imports: [],
  templateUrl: './panel2.component.html',
  styleUrl: './panel2.component.css',
  providers:[CounterService] // make local copy of service to have its own counter value
})
export class Panel2Component implements OnInit{
  localCounterValue: Signal<number>;
  localcounterPrimitive: number;
  constructor(private counterService: CounterService){
    this.localCounterValue = counterService.counter;
    this.localcounterPrimitive = counterService.counter();

    // for primitives to work with change detection you need to use computed or effect to bind the signal to the primitive
    // note there is a closure over the localcounterPrimitive which can cause memory leaks if effect is not cleaned up. I think angular automatially cleans up for us
    effect((onCleanUp)=>{
      this.localcounterPrimitive = counterService.counter();

      // for non primitive clean up like unsubscribing to an observable, clearing out timer intervals, closing connections, etc
      onCleanUp(()=>{
        console.log('cleaning up effect')
      })
    });
  }
  ngOnInit(): void {

  }

  incrementLocalCounter(){
    this.counterService.incrementCounter();
  }

}
