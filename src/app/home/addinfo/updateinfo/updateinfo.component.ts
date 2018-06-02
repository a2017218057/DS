import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { EnterService } from '../../../service/enter.service';
@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateinfoComponent implements OnInit {

  validateFormUpdate: FormGroup;
  @Input() currentData;
  constructor(private fb: FormBuilder, private enterService: EnterService) {
    
    this.validateFormUpdate = this.fb.group({
      nameUpdate          : [ '', [ Validators.required ]],
      dynastyUpdate           : [ '' , [ Validators.required ]],
      placeUpdate             : [ '', [ Validators.required ]],
      typeUpdate         : [ '', [ Validators.required ]],
      loadtimeUpdate           : [ '', [ Validators.required ]],
      pathdocUpdate           : [ '', [ Validators.required ]],
      idUpdate           : [ '', [ Validators.required ]],
      uidUpdate          : [ '', [ Validators.required ]],
      ifcheckUpdate          : [''],
      ifcheckdownUpdate     :[''],
      select_multiple :['', [ this.tagsnumber]]
    });
   }

  ngOnInit() {
    
  }

  _name = null;
  _dynasty = null;
  _place = null;
  _type = null;
  _loadtime = null;
  _pathdoc = null;
  _id = null;
  _uid = null;//自增字段
  _ifcheck = null;
  _ifcheckdown = null;
  searchOptions;
  selectedMultipleOption;
  arr;
  tag_seq:String = '';
  seq : String = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentData) {
      // console.log("-----" + JSON.stringify(this.currentData));
      // console.log(this.currentData.startTime);
      console.log(this.currentData)
      //this.c = this.currentData.ifcheck;
      this._name = this.currentData.name;
      this._dynasty = this.currentData.dynasty;
      this._place = this.currentData.place;
      this._type = this.currentData.type;
      this._loadtime = this.currentData.loadtime;
      this._pathdoc = "http://localhost:8080/"+this.currentData.pathdoc;
      this._id = this.currentData.id;
      this._uid = this.currentData.uid;
      this._ifcheck = this.currentData.ifcheck;
      this._ifcheckdown = this.currentData.ifcheckdown;
      var arr = this.currentData.tag.split(";");
      console.log(arr)
      this.searchOptions = arr;
      console.log(this.searchOptions)
      this.selectedMultipleOption = this.searchOptions;
      console.log(this.selectedMultipleOption)
      this.getFormControl("nameUpdate").markAsDirty();
      this.getFormControl("dynastyUpdate").markAsDirty();
      this.getFormControl("placeUpdate").markAsDirty();
      this.getFormControl("typeUpdate").markAsDirty();    
      this.getFormControl("ifcheckUpdate").markAsDirty(); 
      this.getFormControl("ifcheckdownUpdate").markAsDirty();
    }
  }
  getFormControl(name) {
    return this.validateFormUpdate.controls[ name ];
  }
  confirmFormForParen (){
    for (const key in this.validateFormUpdate.controls) {
      this.validateFormUpdate.controls[ key ].markAsDirty();
    }

    for (const key in this.validateFormUpdate.controls) {
      if (!this.validateFormUpdate.controls[key].valid) {
        return false;
      }
    }
    return true;
  }
  /**
   * 提交表单数据
   * @returns {Observable<Object>}
   */
  submitFormForParent = (id) => {
        
        for(var i = 0;i<this.selectedMultipleOption.length;i++)
        {
            this.seq += this.selectedMultipleOption[i]+";";
        }
        this.seq = this.seq.substring(0,this.seq.length-1)
        //console.log(this.seq)
        const params = {
          id : id,
          name : this.validateFormUpdate.controls[ "nameUpdate" ].value,
          dynasty : this.validateFormUpdate.controls[ "dynastyUpdate" ].value,
          place : this.validateFormUpdate.controls[ "placeUpdate" ].value,
          type : this.validateFormUpdate.controls[ "typeUpdate" ].value,
          uid : this.currentData.uid,
          ifcheck : this.validateFormUpdate.controls['ifcheckUpdate'].value,
          ifcheckdown : this.validateFormUpdate.controls['ifcheckdownUpdate'].value,
          tag : this.seq
        };
    
        // this.leaveService.firstCall();
        return this.enterService.updateInfo(params);
    
      }
        /**
   * 重置表单
   */
    resetFormForParent() {
    if (this.currentData) {
      this._name = this.currentData.name;
      this._dynasty = this.currentData.dynasty;
      this._place = this.currentData.place;
      this._type = this.currentData.type;
      this._loadtime = this.currentData.loadtime;
      this._pathdoc = "http://localhost:8080/"+this.currentData.pathdoc;
      this._id = this.currentData.id;
      this._uid = this.currentData.uid;
      this._ifcheck = this.currentData.ifcheck;
      this._ifcheckdown = this.currentData.ifcheckdown;
      var arr = this.currentData.tag.split(";");
      //console.log(arr)
      this.searchOptions = arr;
      //console.log(this.searchOptions)
      this.selectedMultipleOption = this.searchOptions;
      //console.log(this.selectedMultipleOption)
      this.getFormControl("nameUpdate").markAsDirty();
      this.getFormControl("dynastyUpdate").markAsDirty();
      this.getFormControl("placeUpdate").markAsDirty();
      this.getFormControl("typeUpdate").markAsDirty();  
      this.getFormControl("ifcheckUpdate").markAsDirty();
      this.getFormControl("ifcheckdownUpdate").markAsDirty();
    }
  }
  tagsnumber = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value||control.value == ' ') {
      return { required: true };
    } else if (control.value.length > 8) {
      return { tagsnumber: true, error: true };
    }
  };
  change(tag_get: any){
        
    this.tag_seq = ''
    //console.log(tag_get)
    //console.log(this.selectedMultipleOption)
    if(tag_get)
    {
    
    for(var i = 0;i < tag_get.length;i++){
      
      this.tag_seq += tag_get[i]+';';
      
    }
    //console.log(this.tag_seq.length)
    this.tag_seq = this.tag_seq.substring(0,this.tag_seq.length-1);
    //console.log(this.tag_seq.substring(0,this.tag_seq.length-1))
    
  }
  }
}
