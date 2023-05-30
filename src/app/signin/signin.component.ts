import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(public router:Router){}
  showtext:boolean=false
  public email:any
  public password:any
  public details=[
    {"email":"jukshio","password":"jukshio","name":"jukshio"},
    {"email":"avinash","password":"avinash","name":"avinash"}
  ]
  eyebutton(){
    this.showtext=!this.showtext
  }

  signin() {
    let loginSuccessful = false;
    for (let i = 0; i < this.details.length; i++) {
      if (this.email == this.details[i].email && this.password == this.details[i].password) {
        loginSuccessful = true;
        break; // Exit the loop if a match is found
      }
    }
    
    if (loginSuccessful) {
      this.router.navigateByUrl('/model')
    } else {
      alert("Login failed");
    }
  }

}
