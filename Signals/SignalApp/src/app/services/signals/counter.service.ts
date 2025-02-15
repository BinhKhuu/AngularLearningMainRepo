import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _counter = signal(0);
  public counter = this._counter.asReadonly();
  
  constructor() { }
  
  public incrementCounter(){
    console.log('incrementing counter')
    this._counter.set(this._counter() + 1);
    console.log('new counter is ', this.counter())
  }

}
