import { Injectable } from '@angular/core';

@Injectable()
export class IpService {

  constructor() { }
  visit(){
    return 'http://localhost:8080'
  }
}
