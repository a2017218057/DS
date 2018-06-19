import { Component, OnInit } from '@angular/core';
import { EnterService } from '../service/enter.service';
@Component({
  selector: 'app-tongji',
  templateUrl: './tongji.component.html',
  styleUrls: ['./tongji.component.css']
})
export class TongjiComponent implements OnInit {

  totaluser;
  totaldoc;
  totalisdown;
  totalischeck;
  percheck;
  perdown;
  constructor(private enterService:EnterService) {this.refreshData(true); }

  ngOnInit() {
  }
  refreshData(reset = false) {
    this.enterService.totaluser().subscribe((data: any)=>{
      this.totaluser = data.data.totaluser;
    });
    this.enterService.totaldoc().subscribe((data: any)=>{
      this.totaldoc = data.data.totaldoc;
      this.totalischeck = data.data.totalischeck;
      this.totalisdown = data.data.totalisdown;
      this.percheck = data.data.percheck;
      this.perdown = data.data.perdown;
    });
  }
}
