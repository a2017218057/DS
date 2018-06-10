import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CheckUserService } from '../../../service/check-user.service';
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
  fileList2: UploadFile[] = [];
  pathdoc:any;
  pathpic:any;
  pathpreview:any;
  pathmovie:any;
  ispic:boolean;
  namedoc = null;
  namepic = null;
  namepreview = null;
  f : any;
  picname: String;
  smallpic: String;
  validateForm: FormGroup;
  submitted = false;
  uploading = false;
  flag:any;
  constructor(
    private checkUserService:CheckUserService,
    private fb: FormBuilder,
    private enterService: EnterService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private uploadpicService: UploadpicService,private http: HttpClient ) {
      this.validateForm = this.fb.group({
        name            : [ '', [ Validators.required ] ],
        dynasty          : [ '', [ Validators.required ]],
        place            : [ '', [ Validators.required]],
        type            : [ '', [ Validators.required ] ],
        select_multiple :['', [ this.tagsnumber]],
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
        if(this.handleUpload1()&&this.handleUpload2()){
          this.enterService.addinfopicture(this.validateForm.controls['name'].value,
          this.validateForm.controls['dynasty'].value,
         this.validateForm.controls['place'].value,
         this.validateForm.controls['type'].value,
       this.pathdoc,
     this.pathpreview,
    this.validateForm.controls['ifcheck'].value,
  this.tag_seq,this.validateForm.controls['ifcheckdown'].value,this.ispic,this.pathmovie).subscribe(
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
          this.nzMessageService.error('请上传文件！'); 
       }
        }    
      
    }
  
    beforeUpload = (file: UploadFile): boolean => {
      this.fileList.push(file);
      return false;
    }
  
    
    ngOnInit() {
      
    }
  
    getFormControl(name) {
      return this.validateForm.controls[ name ];
    }

    /*
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
      return true;
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
    */
   
    beforeUpload1 = (file: UploadFile): boolean => {
      //this.f = file;
      const isLt15M = file.size / 1024 / 1024 < 45;
      
    if (!isLt15M) {
      this.nzMessageService.error('文件应小于40MB!');
    }
    
    else{
      this.namedoc = file.name;
      var timetemp = new Date().getTime();
      
      //console.log(file.name);
      //this.pathdoc = file.name.replace(/\+/g, '%2B');
      var doctype = file.name.substring(file.name.lastIndexOf("."))
      this.pathdoc = this.checkUserService.current_user+timetemp+doctype;
      console.log(this.pathdoc)
      this.fileList1.push(file);
      //console.log(this.fileList1)
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
        formData.append('filepath',this.pathdoc)
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

      beforeUpload2 = (file: UploadFile): boolean => {       //预览文件
        //this.f = file;
        const isLt15M = file.size / 1024 / 1024 < 15;
        const isMP4 = file.type === 'video/mp4';
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        
      if (!isJPG&&!isPNG&&!isGIF&&!isMP4) {
        this.nzMessageService.error('您只可以上传JPG、PNG、GIF、MP4格式的文件！');
      }
      else if (!isLt15M) {
        this.nzMessageService.error('文件应小于15MB!');
      }
      else
      {
        var pretype = file.name.substring(file.name.lastIndexOf("."))
        if(isMP4){
          this.flag = 1;
          console.log("是MP4！")
          var timetemp = new Date().getTime();
          
          this.pathpreview = "videopic.jpg";
          this.pathmovie = this.checkUserService.current_user+timetemp+pretype;
          this.fileList2.push(file);
          this.ispic = false;
        }
        else{
          this.flag = 0;
        var timetemp = new Date().getTime();
        this.namepreview = file.name;
        console.log(file.filename+file.name+file.type);
        this.pathpreview = this.checkUserService.current_user+timetemp+pretype;
        this.ispic = true;
        this.fileList2.push(file);
              
      }
      }
        return false;
      }
      handleUpload2() { //预览文件
        //this.fileList.push(this.f);
        if(this.namedoc == null)
        {
          this.nzMessageService.error('文件上传为空')
          return false;
        }
        else
        {
          if(this.flag == 1){
            const formData = new FormData();
            this.fileList2.forEach((file: any) => {
              formData.append('file', file);
            });
            formData.append('filepath',this.pathmovie)
            this.uploading = true;
            // You can use any AJAX library you like
            const req = new HttpRequest('POST', 'http://localhost:8080/leave/add/uploadpreview', formData, {
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
          else if(this.flag == 0){
            const formData = new FormData();
            this.fileList2.forEach((file: any) => {
              formData.append('file', file);
            });
            formData.append('filepath',this.pathpreview)
            this.uploading = true;
            // You can use any AJAX library you like
            const req = new HttpRequest('POST', 'http://localhost:8080/leave/add/uploadpreview', formData, {
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
        
        }

     
      change(tag_get: any){
        
        this.tag_seq = ''
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
      tagsnumber = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value||control.value == ' ') {
          return { required: true };
        } else if (control.value.length > 8) {
          return { tagsnumber: true, error: true };
        }
      };
      
}
