import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {NavigationExtras, Router} from "@angular/router";
import { EnterService } from '../service/enter.service';
import { CheckUserService } from '../service/check-user.service';
import {NzMessageService} from "ng-zorro-antd";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  constructor( private fb: FormBuilder,
               private router: Router,
               private enterService: EnterService,
               private checkUserService: CheckUserService,
               private _message: NzMessageService
               ) {
    this.validateForm = fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
      
    });
  }

  ngOnInit(): void {
    console.log("RegisterPageComponent ngOnInit");
  }

  /**
   * 登录
   * @private
   */
  _submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    
    if (this.validateForm.valid) {
      // console.log('Valid!');
      console.log(this.validateForm.value);
      this.enterService.register(this.validateForm.controls['username'].value, this.validateForm.controls['password'].value).subscribe(
        data => {
          if ( data['errno'] === 0){
            // let navigationExtras: NavigationExtras = {
            //   queryParams: { 'username': data['data']['username'] },
            // };
            console.log("bingo！")
          
            // this.router.navigate(['main'], navigationExtras);
            this.router.navigate(['login']);
            this._message.create("success",data['data']['username']+"注册成功！");
          } else {
            this._message.create("error", "注册失败");
            this.resetForm();
          }
        },
        err => {
          this._message.create("error", "注册失败,未知错误");
          this.resetForm();
        }
      );
    }
    
  }

  /**
   * 重置表单
   */
  resetForm() {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

}
