import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modeltracking',
  templateUrl: './modeltracking.component.html',
  styleUrls: ['./modeltracking.component.css']
})
export class ModeltrackingComponent {
  constructor(public routrer:ActivatedRoute){}
  public name=""
  ngOnInit(){
    this.routrer.paramMap.subscribe(
      {
        next:(data:any)=>{return this.name=data.get("name")}
      }
    )
  }

}
