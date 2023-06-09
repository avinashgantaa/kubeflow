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
  public name=""
  public details=[
    {"email":"admin@jukshio.com","password":"admin","name":"John Doe"},
    {"email":"avinash@jukshio.com","password":"avinash","name":"avinash"}
  ]
  eyebutton(){
    this.showtext=!this.showtext
  }

  signin() {
    let loginSuccessful = false;
    for (let i = 0; i < this.details.length; i++) {
      if (this.email == this.details[i].email && this.password == this.details[i].password) {
        loginSuccessful = true;
        this.name=this.details[i].name
        break; 
      }
    }
    
    if (loginSuccessful) {
      sessionStorage.setItem("name",this.name)
      this.router.navigate(['/otpverification'])
    } else {
      alert("Login failed");
    }
  }

}
