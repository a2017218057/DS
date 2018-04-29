import { Component, OnInit } from '@angular/core';
import { CheckUserService } from '../../service/check-user.service';
import { EnterService } from '../../service/enter.service';

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

  json = JSON;
  model_data;
  current_user;

  constructor(private checkUserService:CheckUserService,
              private enterService:EnterService) { }

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
}
