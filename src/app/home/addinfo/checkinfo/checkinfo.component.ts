import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EnterService } from '../../../service/enter.service';

@Component({
  selector: 'app-checkinfo',
  templateUrl: './checkinfo.component.html',
  styleUrls: ['./checkinfo.component.css']
})
export class CheckinfoComponent implements OnInit {

  validateFormUpdate: FormGroup;
  @Input() currentData;
  _name = null;
  _dynasty = null;
  _place = null;
  _type = null;
  _loadtime = null;
  _pathpic = null;
  _id = null;
  _uid = null;//自增字段
  constructor(private fb: FormBuilder,private enterService: EnterService) {
    this.validateFormUpdate = this.fb.group({
      nameUpdate          : [ '', [ Validators.required ]],
      dynastyUpdate           : [ '' , [ Validators.required ]],
      placeUpdate             : [ '', [ Validators.required ]],
      typeUpdate         : [ '', [ Validators.required ]],
      loadtimeUpdate           : [ '', [ Validators.required ]],
      pathpicUpdate           : [ '', [ Validators.required ]],
      idUpdate           : [ '', [ Validators.required ]],
      uidUpdate          : [ '', [ Validators.required ]]
    });
   }

  ngOnInit() {
    this._name = this.currentData.name;
      this._dynasty = this.currentData.dynasty;
      this._place = this.currentData.place;
      this._type = this.currentData.type;
      this._loadtime = this.currentData.loadtime;
      this._pathpic = "http://localhost:8080/"+this.currentData.pathpic;
      this._id = this.currentData.id;
      this._uid = this.currentData.uid;
  }
  test(){
    console.log(this._pathpic)
    window.open('http://localhost:8080/leave/download/pic?pathpic='+this.currentData.pathpic,'下载文件')
  }
  DownloadFile()
  {
    console.log("download")
    this.enterService.DownloadPic(this.currentData.pathpic).subscribe(
      data =>{
          
          console.log("返回")
      },
      err =>{

      }
      );
  }
}