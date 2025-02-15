import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class BetterloggerService  extends LoggerService{

  constructor() { 
    super();
  }

  override log(): void {
    console.log('better logger')
  }


}
