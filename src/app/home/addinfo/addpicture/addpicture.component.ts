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
  tag_seq:String = '';
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
        select_multiple :['', [ this.tagsnumber ]],
        ifcheck         :[true],
        ifcheckdown     :[true],

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
            //console.log(this.validateForm.controls['ifcheck'].value);
            this.enterService.addinfopicture(this.validateForm.controls['name'].value,
            this.validateForm.controls['dynasty'].value,
           this.validateForm.controls['place'].value,
           this.validateForm.controls['type'].value,
         this.pathdoc,
       this.pathpic,
      this.validateForm.controls['ifcheck'].value,
    this.tag_seq,this.validateForm.controls['ifcheckdown'].value).subscribe(
           data =>{
               if(data['errno'] === 0)
               {
                 //console.log("bingo！!!");
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
            //console.log("else1111111111111")
            this.pathdoc = this.pathpic;
            this.enterService.addinfopicture(this.validateForm.controls['name'].value,
            this.validateForm.controls['dynasty'].value,
           this.validateForm.controls['place'].value,
           this.validateForm.controls['type'].value,
         this.pathdoc,
       this.pathpic,
       this.validateForm.controls['ifcheck'].value,this.tag_seq,this.validateForm.controls['ifcheckdown'].value).subscribe(
           data =>{
               if(data['errno'] === 0)
               {
                 //console.log("bingo！!!");
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
      //console.log("url"+file.url);
      //console.log("thumbUrl"+file.thumbUrl)
      //console.log(file.name);
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;

    }
    beforeUpload = (file: UploadFile): boolean => {
      //console.log(file);
      //console.log(this.fileList)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isMP4 = file.type === 'video/mp4';
    if (!isJPG&&!isPNG&&!isGIF&&!isMP4) {
      this.nzMessageService.error('您只可以上传JPG、PNG、GIF格式的图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.nzMessageService.error('图片必须小于2M！');
    }
      this.namepic = file.name;
      this.pathpic = "img/"+file.name;
      //this.fileList.push(file);
      this.f = file;
      return (isJPG && isLt2M)||(isGIF&&isLt2M)||(isPNG&&isLt2M);
    }

    handleUpload() {
      //console.log(this.namepic)
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
          //console.log(file);
          formData.append('file', file);
          
        });
        
        //formData.append('file',this.f);
        //console.log(this.f)
        this.uploading = true;
   
        const req = new HttpRequest('POST', 'http://localhost:8080/leave/add/uploadpic', formData, {
           reportProgress: true
        });
        //console.log(req)
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
          //console.log(event['body']['errno'])
          this.uploading = false;
          //this.nzMessageService.success('upload successfully.');
        }, (err) => {
          this.uploading = false;
          this.nzMessageService.error('upload failed.');
        });
        return true;
      }
      
    }
    beforeUpload1 = (file: UploadFile): boolean => {
      //this.f = file;
      const isLt15M = file.size / 1024 / 1024 < 15;
      const isMP4 = file.type === 'video/mp4';
    if (!isMP4) {
      this.nzMessageService.error('您只可以上传MP4F格式的文件！');
    }
    else if (!isLt15M) {
      this.nzMessageService.error('文件应小于15MB!');
    }
    else
    {

      this.namedoc = file.name;
      console.log(file.url+file.originFileObj+file.value);
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
          //this.nzMessageService.success('upload successfully.');
        }, (err) => {
          this.uploading = false;
          this.nzMessageService.error('upload failed.');
        });
        return true;
      } 
      
      }
      searchOptions = [
        
        
      ];
      change(tag_get: any){
        
        this.tag_seq = ''
        if(tag_get)
        {
        
        for(var i = 0;i < tag_get.length;i++){
          
          this.tag_seq += tag_get[i]+';';
          
        }
        //console.log(this.tag_seq)
        
      }
      }
      tagsnumber = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value||control.value == ' ') {
          return { required: true };
        } else if (control.value.length > 8) {
          return { tagsnumber: true, error: true };
        }
      };
      
}
