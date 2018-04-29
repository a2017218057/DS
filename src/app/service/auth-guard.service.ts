import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {CheckUserService} from "./check-user.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private checkUserService: CheckUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  checkLogin(){
    if (this.checkUserService.isLogin) { return true; }

    this.router.navigate(['/login']);
    return false;
  }

}