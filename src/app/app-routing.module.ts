import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './home/info/info.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AddinfoComponent } from './home/addinfo/addinfo.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {
    path: 'home',
    component : HomeComponent,
    canActivate: [AuthGuardService],
    children : [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', component: InfoComponent},      
      {path: 'addinfo', component: AddinfoComponent},    
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }