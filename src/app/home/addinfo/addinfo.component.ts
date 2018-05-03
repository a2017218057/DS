import { Component, OnInit } from '@angular/core';
import { CheckUserService } from '../../service/check-user.service';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

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

  //@ViewChild(AskLeaveUpdateFormComponent) formUpdateChild: AskLeaveUpdateFormComponent;
  constructor() { }

  ngOnInit() {
    
    
  }
  
   

}
