import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent {
  constructor(public route:Router){}
  public Completed=25
  public inprogress=15
  public yettostart=60
  datasetdownload(){
    this.route.navigate(['final/'])

  }
  modeltraining(){
    this.route.navigate(['final/modeltracker'])
  }

}
