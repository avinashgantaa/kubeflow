import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-frlogin',
  templateUrl: './frlogin.component.html',
  styleUrls: ['./frlogin.component.css']
})
export class FrloginComponent {
  constructor(public route:Router){}
  trigger:Subject<void>=new Subject()
  get $trigger():Observable<void>{
    return this.trigger.asObservable()
  }
  previewimage:any
  snapshot(event:WebcamImage){
    this.previewimage=event.imageAsDataUrl

  }
  imagecapture(){
    this.trigger.next()
    sessionStorage.setItem("image",this.previewimage)
  }
  proccedbutton(){
    this.route.navigate(['/model'])

  }
  
  checkwebcam(){
    navigator.mediaDevices.getUserMedia({
      video:{
        width:500,
        height:500
      }
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

}
