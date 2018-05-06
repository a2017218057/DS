import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './home/info/info.component';
import { EnterService } from './service/enter.service';
import { CheckUserService } from './service/check-user.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AddinfoComponent } from './home/addinfo/addinfo.component';
import { AddpictureComponent } from './home/addinfo/addpicture/addpicture.component';
import { UpdateinfoComponent } from './home/addinfo/updateinfo/updateinfo.component';
import { UploadpicService } from './service/uploadpic.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InfoComponent,
    AddinfoComponent,
    AddpictureComponent,
    UpdateinfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [EnterService,CheckUserService,AuthGuardService,UploadpicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
