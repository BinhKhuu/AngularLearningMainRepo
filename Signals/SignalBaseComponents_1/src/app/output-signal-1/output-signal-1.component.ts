import { Component, input, output, signal } from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { from, interval, of, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-output-signal-1',
  imports: [],
  templateUrl: './output-signal-1.component.html',
  styleUrl: './output-signal-1.component.css'
})
export class OutputSignal1Component {

  // normal signal bound to an emitter
  count = signal(10)
  countUpdated = output<number>();
  
  // observable that emits once - note that if promise resolves immidiately the parent event is not triggered e.g. of(1)
  private promise = new Promise<string>((resolve) => { setTimeout(() => { resolve('Promise resolved!'); }, 2000); }); 
  private observable = from(this.promise);
  outputObservable = outputFromObservable<string>(this.observable)
  
  // subject to control how many times we want to emit a new value to the output observable
  private outputSubject = new Subject<number>();
  outputToObservable2 = outputFromObservable<number>(this.outputSubject)

  // memory leak with interval and outputFromObservable because we can't unsubscribe from the parent observer
  private interval$ = interval(10000);
  memoryLeakToObservable = outputFromObservable<number>(this.interval$)
  private intervalSubject;
  constructor(){
    this.intervalSubject = this.interval$.subscribe((value)=>{
      console.log('internvale subject ', value)
    });
  }

  updateCountChildEmit(){
    this.count.update((currValue) => currValue + 11);
    this.countUpdated.emit(this.count());
  }

  outputObservableEmit(){
    this.outputSubject.next(this.count())

    // only stops timer for the subject in this component not parents
    this.intervalSubject.unsubscribe();
  }
}
