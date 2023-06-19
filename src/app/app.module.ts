import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ModeltrackingComponent } from './modeltracking/modeltracking.component';
import { HttpClientModule } from '@angular/common/http';
import { ModeltrackerComponent } from './modeltracker/modeltracker.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { FinalComponent } from './final/final.component';
import { FrloginComponent } from './frlogin/frlogin.component';
import { WebcamModule } from 'ngx-webcam';
const routes:Routes=[
  {path:'',loadChildren:()=>import('./login/login.module').then(posres=>posres.LoginModule)}
]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ModeltrackingComponent,
    ModeltrackerComponent,
    OtpverificationComponent,
    FinalComponent,
    FrloginComponent
  ],
  imports: [
    WebcamModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
