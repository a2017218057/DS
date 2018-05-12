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
  tag_seq: String = ''
  name_seq: String = ''
  p;
  isCollapsed = false;
  triggerTemplate = null;
  
  _namevalue = '';
  _tagvalue = '';
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

  searchTagsAndName(name_get:any,tag_get:any){
    //console.log(tag_get[0])
    this.tag_seq = '';
    this.name_seq = '';
    if((tag_get==''&&name_get==' ')||(tag_get==' '&&name_get=='')||(tag_get==' '&&name_get==' ')){
      this.nzMessageService.create("error","名称和标签搜索不能为空或空格！")
    }
    else{

      this.tag_seq = tag_get;
      this.name_seq = name_get;
      console.log(this.name_seq+"和"+this.tag_seq)
      let navigationExtras: NavigationExtras = {
        queryParams: { 'tag': this.tag_seq,'name':this.name_seq},
      };
  this.router.navigate(['home/info/'],navigationExtras);
    }
    
  }

}
