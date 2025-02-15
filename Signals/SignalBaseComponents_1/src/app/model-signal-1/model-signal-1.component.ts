import { Component, effect, model, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-model-signal-1',
  imports: [],
  templateUrl: './model-signal-1.component.html',
  styleUrl: './model-signal-1.component.css'
})
export class ModelSignal1Component implements OnChanges {

  modelInput_required = model<number>();
  modleInput_alias = model<number>(0,{
    alias: 'modelInputAliased'
  })
  // model does not have a transform option instead use ngOnChanges and .update((value:string) => ...) to transform
  // note currently effect(...) is causing an infinite loop
  modelInput_Transform = model<string>('',{}) 
  modelInput_Sginal_Required = model<number>();

  constructor(){

    // effect will cause an infite loop
    // effect(()=>{
    //   this.modelInput_Transform();
    //   this.modelInput_Transformed();
    // })
  }
  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes){
      const change = changes[propName]
      if(propName ==  'modelInput_Transform'){
        const { previousValue, currentValue, firstChange } = change;
        console.log('transforming')
        this.modelInput_Transformed();
      }
    }
  }

  ngOnInit(){
  }

  modelInput_Transformed(){
    this.modelInput_Transform.update((value:string) => `${value} hmmm`);
    console.log('model transformed');
  }

  updateModelSignals(){
    this.modleInput_alias.update((value:number|undefined) => value ? value + value : 0);
    this.modelInput_required.update((value:number|undefined) => value ? value + value : 0);
    this.modelInput_Transform.update((value:string) => `${value} =)`);
    this.modelInput_Sginal_Required.update((value:number | undefined) => value ? value + value : 10);
  }
}
