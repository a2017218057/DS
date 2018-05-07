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
  namedoc = null;
  namepic = null;
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
        if(this.handleUpload())
        {
          if(this.handleUpload1())
          {
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
          else
          {
            console.log("else1111111111111")
            this.pathdoc = this.pathpic;
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
       else
       {
          this.nzMessageService.error('请上传预览图！'); 
       }
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
      this.namepic = file.name;
      this.pathpic = "img/"+file.name;
      //this.fileList.push(file);
      this.f = file;
      return true;
    }

    handleUpload() {
      console.log(this.namepic)
      if(this.namepic == null)
      {
        this.nzMessageService.error('图片上传为空')
        return false;
      }
      else
      {
        this.fileList.push(this.f);
        const formData = new FormData();
        
        this.fileList.forEach((file: any) => {
          console.log(file);
          formData.append('file', file);
          
        });
        
        //formData.append('file',this.f);
        console.log(this.f)
        this.uploading = true;
   
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
        return true;
      }
      
    }
    beforeUpload1 = (file: UploadFile): boolean => {
      //this.f = file;
      const isLt43M = file.size / 1024 / 1024 < 43;
    if (!isLt43M) {
      this.nzMessageService.error('文件应小于43MB!');
    }
    else
    {
      this.namedoc = file.name;
      this.pathdoc = "doc/"+file.name;
      this.fileList1.push(file);
    }
      return false;
    }
    handleUpload1() { //文件
      //this.fileList.push(this.f);
      if(this.namedoc == null)
      {
        this.nzMessageService.error('文件上传为空')
        return false;
      }
      else
      {
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
          this.uploading = false;
          this.nzMessageService.success('upload successfully.');
        }, (err) => {
          this.uploading = false;
          this.nzMessageService.error('upload failed.');
        });
        return true;
      } 
      
      }
      
  

}
