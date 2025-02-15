import { Directive, effect, ElementRef, HostListener, Input, input, InputSignalWithTransform, model, numberAttribute, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective {
  @Input({required: false}) hoverColor: string = 'lightblue';
  @Input() value2: string = '';
  value: InputSignalWithTransform<string, string|undefined> = input('',{transform: this.valueTransform});
  aliasValue = input(0, {alias: 'myAliasValue', transform: numberAttribute});
  modelValue = model(0);


  constructor(private el: ElementRef,
    private renderer: Renderer2
  ) { 
    console.log('constructor')
    this.el.nativeElement.style.backgroundColor = 'red';
    effect(()=>{
      console.log('parentPreopty changed:', this.value())
    })

  }

  @HostListener('mouseenter') onMouseenter(){
    console.log('mouse enter', this.value());
    this.increment();
    var color = this.value2 ? this.value2 : 'lightblue'
    this.renderer.setStyle(this.el.nativeElement,
      'background-color', 
      color
    );
  }

  @HostListener('mouseleave') onMouseLeave(){
    console.log('mouse leave', this.value())
    
    this.renderer.removeStyle(this.el.nativeElement,
      'background-colour'
    );
  }

  ngOnChanges(){
    console.log('changes', this.aliasValue(), this.modelValue());
  }

  valueTransform(value: string | undefined): string {
    // this is scoped to the function so should print undefined
    console.log('value Transform', this.aliasValue);
    return value?.trim() ?? '';
  }
  
  increment() {
    this.modelValue.update(oldValue => oldValue + 10);
  }
  
}
