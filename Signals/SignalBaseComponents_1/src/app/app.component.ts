import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalInput1Component } from "./signal-input-1/signal-input-1.component";
import { OutputSignal1Component } from "./output-signal-1/output-signal-1.component";
import { ModelSignal1Component } from "./model-signal-1/model-signal-1.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalInput1Component, OutputSignal1Component, ModelSignal1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SignalBaseComponents_1';
  inputSignal_NotRequired_Default = 20;
  required_primitive = 10;
  alias_primitive = 20;
  transform_primitive = 'ugh';

  require_signal = signal<number>(10);

  constructor(){}

  updateParentInput(){
    // parent updates child values
    this.alias_primitive+=10;
    this.inputSignal_NotRequired_Default+=10;
    this.required_primitive+=10;
    this.transform_primitive+=' ugh';
    this.require_signal.update((value) => value + value)
  }
  
  countUpdatedParentEvent(event:number){
    console.log('parent count updated output event', event)
  }

  outputObservableParentEvent(event: string){
    console.log('parent output observable event', event)
  }

  outputObservable2ParentEvent(event: number){
    console.log('parent output observable 2 event ', event)
  }

  memoryLeakObservableParentEvent(event: number){
    console.log('memory leak parent event ', event);
  }

  inputSignal_Transformed(event:any){
    console.log('model input transformed event listener')
  }
}
