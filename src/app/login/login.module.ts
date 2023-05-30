import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ModeltrackingComponent } from '../modeltracking/modeltracking.component';
const routes: Routes = [
  {
    path: "", component: LoginComponent, children: [
      { path: '', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {path:'model',component:ModeltrackingComponent}
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
