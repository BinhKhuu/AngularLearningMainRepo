import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private isAuthorized: boolean = true;
  constructor() { }

  public isUserAuthorized(): boolean {
    return this.isAuthorized;
  }


}
