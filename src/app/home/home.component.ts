import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CheckUserService } from '../service/check-user.service';
import {NzMessageService} from "ng-zorro-antd";
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EnterService } from '../service/enter.service';
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
  
  _value = '';
  
    constructor(private router: Router,
                private checkUserService: CheckUserService,
                private nzMessageService: NzMessageService,
                private enterService: EnterService){}

  ngOnInit() {
    
  }
  onSearch(event: string): void {
    console.log(event);
    this.enterService.searchinfo(event).subscribe(
   data =>{
       if(data['errno'] === 0)
       {
         this.nzMessageService.success('查询成功', {nzDuration: 10000});
         this.router.navigate(['home']);
       }
   },
   err =>{

   }
   );
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
