import { Injectable } from '@angular/core';



@Injectable()
export class CheckUserService {

  isLogin = false;
  current_user;

  constructor() {
  }

  login(username){
    this.current_user = username;
    console.log("当前"+this.current_user);
    this.isLogin = true;
  }

  logout(){
    this.current_user = null;
    this.isLogin = false;
  }

}
