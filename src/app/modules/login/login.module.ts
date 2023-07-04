import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
const route:Routes=[
  {path:'',component:LoginComponent,children:[
    {path:'',component:SigninComponent},
    {path:'signup',component:SignupComponent}
  ]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class LoginModule { }
