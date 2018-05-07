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
import { UploadpicService } from '../../../service/uploadpic.service';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-addpicture',
  templateUrl: './addpicture.component.html',
  styleUrls: ['./addpicture.component.css']
})
export class AddpictureComponent implements OnInit {
  fileList: UploadFile[] = [];
  fileList1: UploadFile[] = [];
  pathdoc:any;
  pathpic:any;
  f : any;
  picname: String;
  smallpic: String;
  validateForm: FormGroup;
  submitted = false;
  uploading = false;
  constructor(private fb: FormBuilder,
    private enterService: EnterService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private uploadpicService: UploadpicService,private http: HttpClient ) {
      this.validateForm = this.fb.group({
        name            : [ '', [ Validators.required ] ],
        dynasty          : [ '', [ Validators.required ]],
        place            : [ '', [ Validators.required]],
        type            : [ '', [ Validators.required ] ],
      });
      
}

confirmForm (){
  for (const key in this.validateForm.controls) {
    this.validateForm.controls[ key ].markAsDirty();
  }

  for (const key in this.validateForm.controls) {
    if (!this.validateForm.controls[key].valid) {
      return false;
    }
  }
  return true;
}
    _submitForm() {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[ i ].markAsDirty();
       
      }
      if(!this.confirmForm())
      {
        this.nzMessageService.error('请填写内容', {nzDuration: 10000});
      }
      else
      {

        this.handleUpload();
        this.handleUpload1();  
      console.log(this.validateForm.value);
      console.log(this.picname);
      this.enterService.addinfopicture(this.validateForm.controls['name'].value,
                                       this.validateForm.controls['dynasty'].value,
                                      this.validateForm.controls['place'].value,
                                      this.validateForm.controls['type'].value,
                                    this.pathdoc,
                                  this.pathpic).subscribe(
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
    }
  

  
    
    ngOnInit() {
      
    }
  
    getFormControl(name) {
      return this.validateForm.controls[ name ];
    }

    previewImage = '';
    previewVisible = false;
  
    handlePreview = (file: UploadFile) => {
      console.log("url"+file.url);
      console.log("thumbUrl"+file.thumbUrl)
      console.log(file.name);
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;

    }
    beforeUpload = (file: UploadFile): boolean => {
      console.log(file);
      console.log(this.fileList)
      this.pathpic = "img/"+file.name;
      //this.fileList.push(file);
      this.f = file;
      return true;
    }
    /*
    beforeUpload = (file: File) => {
      //console.log(file.name)
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        this.nzMessageService.error('You can only upload PNG file!');
      }
      const isLt10M = file.size / 1024 / 1024 < 1;
      if (!isLt10M) {
        this.nzMessageService.error('Image must smaller than 10MB!');
      }

      return isPNG && isLt10M;
    }
    */
    /*
    handleChange(info: { file: UploadFile }): void {
      //console.log(info.file.name)
      console.log(info.file)
      if(info.file.status === 'uploading'){
        console.log("unloading");
      }
      if(info.file.status === 'done'){
        this.picname = info.file.name;
        this.smallpic = info.file.thumbUrl;
        console.log(this.picname)
        //console.log(info.file.thumbUrl)
      }
      
    }
    */
    handleUpload() {
      this.fileList.push(this.f);
      const formData = new FormData();
      
      this.fileList.forEach((file: any) => {
        console.log(file);
        formData.append('file', file);
        
      });
      
      //formData.append('file',this.f);
      console.log(this.f)
      this.uploading = true;
      // You can use any AJAX library you like
      /*
      this.uploadpicService.uploadpic(formData).subscribe(
        data =>{
            if(data['errno'] === 0)
            {
              console.log("bingo！!!");
              this.submitted = true;
              this.nzMessageService.success('这是一条成功的提示,并将于10秒后消失', {nzDuration: 10000});
              //this.router.navigate(['home']);
            }
        },
        err =>{

        }
        );
      }*/

      
      const req = new HttpRequest('POST', 'http://localhost:8080/leave/add/uploadpic', formData, {
         reportProgress: true
      });
      console.log(req)
      this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
        console.log(event['body']['errno'])
        this.uploading = false;
        this.nzMessageService.success('upload successfully.');
      }, (err) => {
        this.uploading = false;
        this.nzMessageService.error('upload failed.');
      });
    }
    beforeUpload1 = (file: UploadFile): boolean => {
      //this.f = file;
      const isLt43M = file.size / 1024 / 1024 < 43;
    if (!isLt43M) {
      this.nzMessageService.error('文件应小于43MB!');
    }
    else
    {
      this.pathdoc = "doc/"+file.name;
      this.fileList1.push(file);
    }
      return false;
    }
    handleUpload1() { //文件
      //this.fileList.push(this.f);
      const formData = new FormData();
      this.fileList1.forEach((file: any) => {
        formData.append('file', file);
      });
      this.uploading = true;
      // You can use any AJAX library you like
      const req = new HttpRequest('POST', 'http://localhost:8080/leave/add/uploaddoc', formData, {
        // reportProgress: true
      });
      this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
        console.log(event['body']['data']['path'])
        this.pathpic = event['body']['data']['path'];
        this.uploading = false;
        this.nzMessageService.success('upload successfully.');
      }, (err) => {
        this.uploading = false;
        this.nzMessageService.error('upload failed.');
      });
    } 
  

}
