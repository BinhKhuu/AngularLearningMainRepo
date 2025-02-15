import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { mypopupStateAnimation } from './my-popup.animations';

@Component({
  selector: 'app-my-popup',
  imports: [],
  animations:[mypopupStateAnimation],
  templateUrl: './my-popup.component.html',
  styleUrl: './my-popup.component.css'
})
export class MyPopupComponent {
  // bind angular animation state to property of the host element
  @HostBinding('@state') state: 'opened' | 'closed' = 'closed';
  @Input() get message(): string {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
    console.log('state is', this.state)
  }
  private _message = '';

  @Output() closed = new EventEmitter<void>();
  constructor(
    private cdr: ChangeDetectorRef
  ){}
  closePopup(){
    this.closed.next();
  }
}
