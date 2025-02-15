import { Component, computed, effect, Input, input, OnChanges, Signal, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-signal-input-1',
  imports: [],
  templateUrl: './signal-input-1.component.html',
  styleUrl: './signal-input-1.component.css'
})
export class SignalInput1Component implements OnChanges {
  @Input() classicInput1 = 10;
  @Input() classicInput2 = 'ugh';
  inputSignal = input(); // undefined if no binding from parent
  inputSignal_NotRequired_Default = input(0); //default value is 0 if no binding from parent
  inputSignal_Required = input.required(); //must have inputSignal1_Required binding from parent
  inputSignal_Alias = input(20,{
    alias: 'aliasedInputSignal'
  }); //binding is to aliasedInputSignal not its property name.
  inputSignal_Transform = input(null, {transform: this.transformInput})
  inputSignal_Computed = computed(() =>{
    console.log('computing input')
    return this.inputSignal_NotRequired_Default() + this.inputSignal_Alias();
  })
  
  constructor(){
    effect(()=>{
      console.log('effect detected signals updated: inputSignal_Alias, inputSignal_NotRequired_Default,inputSignal_Computed, cant tell you which one updated');
      this.inputSignal_Alias();
      this.inputSignal_NotRequired_Default();
      this.inputSignal_Computed();
    });
  }

  // Note that ngOnChanges is detecting changes to signal inputs as well as @Input
  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes){
      const change = changes[propName]
      const { previousValue, currentValue, firstChange } = change;
      console.log(`ngOnChanges detected change for : ${propName}`, previousValue, currentValue, firstChange)
    }
  }

  transformInput(value: string | null){
    console.log('transforming inputSignal');
    if(value == null)
      value = 'null transformed';
    else
      value = value + ' transformed';

    return value;
  }

  updateInput1(){
    alert('signal inputs are read only can only update from parent');
  }
}
