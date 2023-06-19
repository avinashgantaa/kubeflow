import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ModeltrackingComponent } from '../modeltracking/modeltracking.component';
import { ModeltrackerComponent } from '../modeltracker/modeltracker.component';
import { OtpverificationComponent } from '../otpverification/otpverification.component';
import { FinalComponent } from '../final/final.component';
import { FrloginComponent } from '../frlogin/frlogin.component';
import { WebcamModule } from 'ngx-webcam';
const routes: Routes = [
  {
    path: "", component: LoginComponent, children: [
      { path: '', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {path:'frlogin',component:FrloginComponent},
  { path: 'model', component: ModeltrackingComponent },
  { path: 'modeltracker', component: ModeltrackerComponent },
  { path: 'otpverification', component: OtpverificationComponent },
  {
    path: 'final', component: FinalComponent,
    children: [
      { path: '', component: ModeltrackingComponent },
      { path: 'modeltracker', component: ModeltrackerComponent }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    WebcamModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
