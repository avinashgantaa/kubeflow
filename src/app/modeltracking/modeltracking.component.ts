import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-modeltracking',
  templateUrl: './modeltracking.component.html',
  styleUrls: ['./modeltracking.component.css']
})
export class ModeltrackingComponent {
  constructor(public routrer:ActivatedRoute, public route:Router){}
  public name=""
  ngOnInit(){
    this.routrer.paramMap.subscribe(
      {
        next:(data:any)=>{return this.name=data.get("name")}
      }
    )
  }
  logout(){
    this.route.navigateByUrl('/')

  }

}
