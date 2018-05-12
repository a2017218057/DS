import { Component,Input, OnInit, ViewChild } from '@angular/core';
import { CheckUserService } from '../../service/check-user.service';
import { EnterService } from '../../service/enter.service';
import {NzModalService} from "ng-zorro-antd";
import {NzMessageService} from 'ng-zorro-antd';
import { UpdateinfoComponent } from '../addinfo/updateinfo/updateinfo.component';
import { CheckinfoComponent } from '../addinfo/checkinfo/checkinfo.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() par;
  param:any = null;
   // 表格变量
   _current = 1;
   _pageSize = 10;
   _total = 1;
   _dataSet = [];
   _loading = false;

   // 提示框变量
  isVisible = false;
  isConfirmLoading = false;

  @ViewChild(UpdateinfoComponent) updateinfochild: UpdateinfoComponent;
  @ViewChild(CheckinfoComponent) checkinfochild: CheckinfoComponent;

  json = JSON;
  model_data;
  current_user;
  update_data;
  i;
  j;
  self;
  tag;
  name;
  constructor(private checkUserService:CheckUserService,
              private enterService:EnterService,
              private confirmServ: NzModalService,
              private  nzMessageService: NzMessageService,
              public activatedRoute:ActivatedRoute) { 

                this.activatedRoute.queryParams.subscribe(params => {
                  
                  this.self = params['self'];
                  this.tag = params['tag'];
                  this.name = params['name'];
                  //console.log(this.param)
                  //console.log(this.cc)
                  //console.log(this.tt)
                  this.refreshData();
                });

              }

  ngOnInit() {
    
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
      //this.refreshData();
    }
  }
  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    if (this.checkUserService.isLogin) {
      //console.log("xxxxxxxxxxxxx")
      if (reset) {
        this._current = 1;
      }
      this._loading = true;
      if(this.name!=null&&this.tag!=null)
      {
        this.enterService.searchinfo(this.name,this.tag,this.current_user, this._current, this._pageSize).subscribe((data: any)=>{
          console.log("搜索并刷新表格数据");
          
          this._loading = false;
          this._total = data.data.total;
          this._dataSet = data.data.list;
          
        });
      }
      else if(this.name == null && this.tag == null)
      {
        if(this.self == 'self')
        {
          this.enterService.getLoadSelfList(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
            console.log("刷新个人表格数据");
            
            this._loading = false;
            this._total = data.data.total;
            this._dataSet = data.data.list;
            //console.log(this._dataSet)
          });
        }
        else
        {
          this.enterService.getLoadDoneList(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
            console.log("刷新表格数据");
            
            this._loading = false;
            this._total = data.data.total;
            this._dataSet = data.data.list;
            //console.log(this._dataSet)
          });
        }
        
      }
      
      
    }
  }

  showModal = (data,i) => {
    this.isVisible = true;
   if(i == 'a')
   {
     this.j = i;
     //console.log("1111111111")
     this.update_data = data;
   }
   if(i == 'b')
   {
     this.j = i;
     //console.log("222222222")
     this.model_data = data;
   }
    
    
  }
  
  handleOk = (e) => {

    if(this.j == 'b')
    {
      this.isVisible = false;
      //console.log("进入b")
    }
    else if(this.j == 'a')
    {

    if (this.checkUserService.isLogin) {
      //console.log("进入a")
            if (!this.updateinfochild.confirmFormForParen()) {
              return;
            }
            this.isConfirmLoading = true;
      
            this.updateinfochild.submitFormForParent(this.current_user).subscribe(
              data => {
                if (data['errno'] === 0) {
                  this.nzMessageService.create('success', `修改成功`);
                  
                    this.refreshData();
                  
      
                } else {
                  this.nzMessageService.create('error', `修改失败`);
                }
                this.isVisible = false;
                this.isConfirmLoading = false;
      
              },
              err => {
                this.nzMessageService.create('error', `修改失败`);
                this.isVisible = false;
                this.isConfirmLoading = false;
              }
            );
          } else {
            this.nzMessageService.create('error', `未登录`);
          }
                
    }
  }

  /**
   * 面板 取消 (Modal)
   * @param e
   */
  handleCancel = (e) => {
    if(this.j == 'b')
    {
      this.isVisible = false;
    }
    else if(this.j == 'a')
    {
      this.isVisible = false;
      this.updateinfochild.resetFormForParent();
    }
  }
   /**
   * 显示 删除 提示框
   * @param data
   */
  showConfirm = (data) => {
    let constance = this;
    let model = this.confirmServ.confirm({
      title  : '警告',
      content: '<b>确认删除该条数据?删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk() {
        if (constance.checkUserService.isLogin) {
          //console.log("okkkk");
          return new Promise((resolve, reject) => {
            //console.log("aaaaaaaaa");
            constance.enterService.deletInfo(data['uid']).subscribe(
              data => {
                if (data['errno'] === 0) {
                  resolve();
                  constance.nzMessageService.create('success', `删除成功`);
                  constance.refreshData();
                } else {
                  resolve();
                  constance.nzMessageService.create('error', `删除失败`);
                }

              },
              err => {
                reject();
                constance.nzMessageService.create('error', `删除失败`);
              });
          });
        } else {
          constance.nzMessageService.create('error', `未登录`);
        }

      },
      onCancel() {
      }
    });
  }
}
