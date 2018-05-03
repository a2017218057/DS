import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CheckUserService } from '../service/check-user.service';
import {NzMessageService} from "ng-zorro-antd";
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedOption;
  searchOptions = [];
  isCollapsed = false;
  triggerTemplate = null;
  
  
    constructor(private router: Router,
                private checkUserService: CheckUserService,
                private nzMessageService: NzMessageService,
                ){}

  ngOnInit() {
    
  }
  searchChange(searchText) {
    const query = encodeURI(searchText);
    console.log(query)
  }
  /*logout(){
    if (this.checkUserService.isLogin) {

      this.leaveService.logout().subscribe(
        data => {
          if (data["errno"] === 0) {
            this.checkUserService.logout();
            this.router.navigate(['login']);
          } else {
            this.nzMessageService.create("error", "登出失败");
          }
        },
        err => {
          this.nzMessageService.create("error", "未知错误");
        }
      );
    } else {
      this.nzMessageService.create("error", "未登录");
    }
  }

  log(msg: string){
    console.log(msg);
  }*/
}
