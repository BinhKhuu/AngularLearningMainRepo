import { Injectable } from '@angular/core';
import { ILogger } from './ILogger';
@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger{

  constructor() { }

  log(){
    console.log('logger service');
  }
}
