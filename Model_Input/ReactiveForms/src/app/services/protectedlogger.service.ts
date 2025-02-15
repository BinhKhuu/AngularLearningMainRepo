import { Injectable } from '@angular/core';
import { ILogger } from './ILogger';

export class ProtectedloggerService extends ILogger{

  constructor(
    private isAuthorized: boolean 
  ) { 
    super();
  }

  override log(): void {
    if(this.isAuthorized){
      console.log('Protected logger');
    }
    else {
      console.error('Unauthorized request');
    }
  }
}
