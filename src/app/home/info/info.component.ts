import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckUserService } from '../../service/check-user.service';
import { EnterService } from '../../service/enter.service';
import {NzModalService} from "ng-zorro-antd";
import {NzMessageService} from 'ng-zorro-antd';
import { UpdateinfoComponent } from '../addinfo/updateinfo/updateinfo.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

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

  json = JSON;
  model_data;
  current_user;
  update_data;
  i;
  j;

  constructor(private checkUserService:CheckUserService,
              private enterService:EnterService,
              private confirmServ: NzModalService,
              private  nzMessageService: NzMessageService,
              ) { 
               
              }

  ngOnInit() {
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
      this.refreshData();
    }
  }

  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    if (this.checkUserService.isLogin) {

      if (reset) {
        this._current = 1;
      }
      this._loading = true;

      this.enterService.getLoadDoneList(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
        console.log("刷新表格数据");
        
        this._loading = false;
        this._total = data.data.total;
        this._dataSet = data.data.list;
      });
      
    }
  }

  showModal = (data,i) => {
    this.isVisible = true;
   if(i == 'a')
   {
     this.j = i;
     console.log("1111111111")
     this.update_data = data;
   }
   if(i == 'b')
   {
     this.j = i;
     console.log("222222222")
     this.model_data = data;
   }
    
    
  }
  
  handleOk = (e) => {

    if(this.j = 'b')
    {
      this.isVisible = false;
    }
    if(this.j = 'a')
    {

    if (this.checkUserService.isLogin) {
      
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
    this.isVisible = false;
    this.updateinfochild.resetFormForParent();
  }
   /**
   * 显示 删除 提示框
   * @param data
   */
  showConfirm = (data) => {
    console.log(data['storagepicture']);
    console.log(data['uid']);
    let constance = this;
    let model = this.confirmServ.confirm({
      title  : '警告',
      content: '<b>确认删除该条数据?删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk() {
        if (constance.checkUserService.isLogin) {
          console.log("okkkk");
          return new Promise((resolve, reject) => {
            console.log("aaaaaaaaa");
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
