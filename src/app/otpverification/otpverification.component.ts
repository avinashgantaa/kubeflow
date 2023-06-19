import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent {
  constructor(public route:Router){}
  public otp:any
  public errormessage:any
  submit(){
    if(this.otp=="325273"){
      this.route.navigate(['/frlogin'])
    }
    else{
      this.errormessage="Please enter valid OTP"
    }

  }

}
