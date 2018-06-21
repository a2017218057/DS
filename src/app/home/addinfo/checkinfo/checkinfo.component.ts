import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EnterService } from '../../../service/enter.service';
import { IpService } from '../../../service/ip.service';

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
  _pathdoc = null;
  _id = null;
  _uid = null;//自增字段
  selectedMultipleOption;
  searchOptions;
  list;
  arr;
  constructor(private fb: FormBuilder,private enterService: EnterService,private ipService: IpService) {
    this.validateFormUpdate = this.fb.group({
      nameUpdate          : [ '', [ Validators.required ]],
      dynastyUpdate           : [ '' , [ Validators.required ]],
      placeUpdate             : [ '', [ Validators.required ]],
      typeUpdate         : [ '', [ Validators.required ]],
      loadtimeUpdate           : [ '', [ Validators.required ]],
      pathdocUpdate           : [ '', [ Validators.required ]],
      idUpdate           : [ '', [ Validators.required ]],
      uidUpdate          : [ '', [ Validators.required ]],
      select_multiple    :['']
    });
   }

  ngOnInit() {
    
  }
  
  test(){
    //console.log(this._pathdoc)
    //console.log(this.currentData.pathdoc)
    window.open('http://localhost:8080/leave/download/doc?pathdoc='+this.currentData.pathdoc,'下载文件')
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentData) {

      this._name = this.currentData.name;
      this._dynasty = this.currentData.dynasty;
      this._place = this.currentData.place;
      this._type = this.currentData.type;
      this._loadtime = this.currentData.loadtime;
      this._pathdoc = "http://localhost:8080/"+this.currentData.pathdoc;
      this._id = this.currentData.id;
      this._uid = this.currentData.uid;

      
      //this.list = "'"+this.currentData.tag.replace(/;/g,"','")+"'"
      var arr = this.currentData.tag.split(";");
      //console.log(arr)
      this.searchOptions = arr;
      //console.log(this.searchOptions)
      this.selectedMultipleOption = this.searchOptions;
      //console.log(this.selectedMultipleOption)
    }
  }

}
