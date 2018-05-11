import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras} from "@angular/router";
import { CheckUserService } from '../service/check-user.service';
import {NzMessageService} from "ng-zorro-antd";
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EnterService } from '../service/enter.service';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedMultipleOption = null;
  tag_seq: String = '';
  p;
  isCollapsed = false;
  triggerTemplate = null;
  
  _value = '';
  @ViewChild(InfoComponent) infochild: InfoComponent;
    constructor(private router: Router,
                private checkUserService: CheckUserService,
                private nzMessageService: NzMessageService,
                private enterService: EnterService,
                private activatedRoute:ActivatedRoute,
                ){
                  
                  
                }

  ngOnInit() {
    this.p = this.activatedRoute.snapshot.params['id'];
    //console.log(this.p)
    
  }
  onSearch(event: string): void {
    console.log(event);
    this.p = event;
     let navigationExtras: NavigationExtras = {
               queryParams: { 'e': event},
             };
    this.router.navigate(['home/info/'],navigationExtras);
    //this.router.navigate(['home/info/2']);
  }
  logout(){
    if (this.checkUserService.isLogin) {

      this.enterService.logout().subscribe(
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
  }
  searchOptions = [
        
        
  ];

  searchTags(tag_get:any){
    //console.log(tag_get[0])
    this.tag_seq = '';
    if(tag_get==' '||tag_get==null){
      this.nzMessageService.create("error","标签搜索不能为空或空格！")
    }
    else{

      for(var i = 0 ; i < tag_get.length; i++){
        this.tag_seq += tag_get[i] + ';';
      }
      //console.log(this.tag_seq)
    }
    let navigationExtras: NavigationExtras = {
      queryParams: { 'tags': this.tag_seq},
    };
this.router.navigate(['home/info/'],navigationExtras);
  }
}
