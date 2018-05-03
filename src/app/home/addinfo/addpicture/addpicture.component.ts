import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { EnterService } from '../../../service/enter.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {NavigationExtras, Router} from "@angular/router";
@Component({
  selector: 'app-addpicture',
  templateUrl: './addpicture.component.html',
  styleUrls: ['./addpicture.component.css']
})
export class AddpictureComponent implements OnInit {

  //fileList: UploadFile;
  picname: String;
  smallpic: String;
  validateForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private enterService: EnterService,
    private nzMessageService: NzMessageService,
    private router: Router, ) {
      
}
    _submitForm() {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[ i ].markAsDirty();
       
      }
      console.log(this.validateForm.value);
      console.log(this.picname);
      this.enterService.addinfopicture(this.validateForm.controls['name'].value,
                                       this.validateForm.controls['dynasty'].value,
                                      this.validateForm.controls['place'].value,
                                      this.validateForm.controls['type'].value,
                                    this.picname,
                                  this.smallpic).subscribe(
                                      data =>{
                                          if(data['errno'] === 0)
                                          {
                                            console.log("bingo！!!");
                                            this.submitted = true;
                                            this.nzMessageService.success('这是一条成功的提示,并将于10秒后消失', {nzDuration: 10000});
                                            this.router.navigate(['home']);
                                          }
                                      },
                                      err =>{

                                      }
                                      );
    }
  

  
    
    ngOnInit() {
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        dynasty: [null, Validators.required],
        place: [null],
        type: [null]
      });
    }
  
    getFormControl(name) {
      return this.validateForm.controls[ name ];
    }
    fileList = [
      
    ];
    previewImage = '';
    previewVisible = false;
  
    handlePreview = (file: UploadFile) => {
      console.log("url"+file.url);
      console.log("thumbUrl"+file.thumbUrl)
      console.log(file.name);
      this.previewImage = file.url || file.thumbUrl;
      //this.previewImage = "D:\mis-api-master\mis-api-master/捕获.PNG";
      this.previewVisible = true;

    }
    /*
    handleChange(info: any): void {
      
      const fileList = info.fileList;
      
      // 2. read from response and show file link
      if (info.file.response) {
        info.file.url = info.file.response.url;
        console.log(info.file.url);
      }
      // 3. filter successfully uploaded files according to response from server
      this.fileList = fileList.filter(item => {
        if (item.response) {
          return item.response.status === 'success';
        }
        return true;
      });
    }
    */
    beforeUpload = (file: File) => {
      //console.log(file.name)
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        this.nzMessageService.error('You can only upload JPG file!');
      }
      const isLt10M = file.size / 1024 / 1024 < 1;
      if (!isLt10M) {
        this.nzMessageService.error('Image must smaller than 10MB!');
      }
      return isPNG && isLt10M;
    }
    handleChange(info: { file: UploadFile }): void {
      //console.log(info.file.name)
      if(info.file.status === 'uploading'){
        console.log("unloading");
      }
      if(info.file.status === 'done'){
        this.picname = info.file.name;
        this.smallpic = info.file.thumbUrl;
        console.log(this.picname)
        console.log(info.file.thumbUrl)
      }
      
    }

}
