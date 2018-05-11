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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      remember: [null]
    });
  }

  ngOnInit(): void {
    console.log("LoginPageComponent ngOnInit");
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
      this.enterService.login(this.validateForm.controls['username'].value, this.validateForm.controls['password'].value).subscribe(
        data => {
          if ( data['errno'] === 0){
            // let navigationExtras: NavigationExtras = {
            //   queryParams: { 'username': data['data']['username'] },
            // };
            //console.log("bingo！")
            this.checkUserService.login(data['data']['username']);
            // this.router.navigate(['main'], navigationExtras);
            this.router.navigate(['home']);
          } else {
            this._message.create("error", "账号或密码错误");
            this.resetForm();
          }
        },
        err => {
          this._message.create("error", "登录失败,未知错误");
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
