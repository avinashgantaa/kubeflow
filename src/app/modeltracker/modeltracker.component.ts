import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Models } from '../models';
import * as d3 from 'd3'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modeltracker',
  templateUrl: './modeltracker.component.html',
  styleUrls: ['./modeltracker.component.css']
})
export class ModeltrackerComponent {
  constructor(public router: Router, public trainingSession: HttpClient, public csv: HttpClient, public image:HttpClient,public sanitize:DomSanitizer) { }
  public previewimage:any
  ngOnInit() {
    this.getTrainingsessions()
    let blobimage:any=sessionStorage.getItem("image")
    this.image.get(blobimage,{responseType:'blob'}).subscribe(
      {next:(data)=>{
        let bloburl=URL.createObjectURL(data)
        this.previewimage=this.sanitize.bypassSecurityTrustUrl(bloburl)

      },
      error:(err)=>{console.log(err)}
      }
    )
  }
  public name=sessionStorage.getItem("name")
  public trainingsessionUrl = 'https://ma.vishwamcorp.com/v1/get_training_sessions'
  public trainingids: any[] = []
  public trainingSessions: any = []
  public trainingsessionName: any
  public models: Models[] = []
  public sliderValue = 0.5
  public tpCount: any
  public tnCount: any
  public fpCount: any
  public fnCount: any
  public accuracy: any
  public realaccuracy: any
  public fakeaccuracy: any
  public selectedModelName: any
  public modelpath: any
  public predictionscores: any[] = []
  public model1 = "../../assets/csvs/model1.csv"
  public model2 = "../../assets/csvs/model2.csv"
  public model3 = "../../assets/csvs/model3.csv"
  public counts: any[] = []
  public xData = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  public svg: any
  public height: any
  public width: any
  public margin=20
  public margin2=50
  public xaxis: any
  public yaxis: any
  public zoomstatus:boolean=true
  routetofinal(){
    this.router.navigate(['/final'])
  }
  zoomfn(){
    this.zoomstatus=!this.zoomstatus
  }
  getlinechart() {
    let id=document.getElementsByClassName('d3chart')
for (let i = 0; i < id.length; i++) {
  let element = id[i] as HTMLElement;
  this.svg=d3.select(element)
    this.height=this.svg.attr('height')-this.margin
    this.width=this.svg.attr('width')-this.margin2
    this.xaxis=d3.scaleLinear().range([0,this.width])
    this.xaxis.domain([0,d3.max(this.xData.map(d=>d))])
    // this.svg.selectAll('.xdata').remove()
    // this.svg.append('g').attr('class','xdata').call(d3.axisBottom(this.xaxis).ticks(5)).attr('transform','translate(30,100)')
    this.yaxis=d3.scaleLinear().range([this.height,0])
    this.yaxis.domain([d3.min(this.counts.map(d=>d)),d3.max(this.counts.map(d=>d))])
    // this.svg.selectAll('.ydata').remove()
    // this.svg.append('g').attr('class','ydata').call(d3.axisLeft(this.yaxis).ticks(3)).attr('transform','translate(30,10)')
    this.svg.selectAll('.dot').remove()
    this.svg.append('g').selectAll('.dot').data(this.counts).enter().append('circle').attr('class','dot').attr('cx',(d:any,i:any)=>this.xaxis(this.xData[i])).attr('cy',(d:any)=>this.yaxis(d))
    .attr('r',3).attr('fill','none').attr('stroke','#211F9F').attr('transform','translate(30,10)')
    let line=d3.line().x((d:any,i:any)=>this.xaxis(this.xData[i])).y((d:any)=>this.yaxis(d))
    this.svg.selectAll('.line').remove()
    this.svg.append('path').attr('class','line').datum(this.counts).attr('d',line).attr('fill','none').attr('stroke','#211F9F').attr('transform','translate(30,10)')
}
    
  }
  getbarchart() {
    let id = document.getElementById("bar") as HTMLElement;
    this.svg = d3.select(id);
    this.height = this.svg.attr('height') - this.margin;
    this.width = this.svg.attr('width') - this.margin;
  
    this.xaxis = d3.scaleBand().range([0, this.width]).domain(this.xData.map((d) => d.toString())).padding(0.5);
    this.svg.selectAll('.xdata').remove()
    this.svg.append('g').attr('class','xdata').call(d3.axisBottom(this.xaxis)).attr('transform', 'translate(30,180)');
  
    this.yaxis = d3.scaleLinear().range([this.height, 0]);
    this.yaxis.domain([d3.min(this.counts.map((d) => d)), d3.max(this.counts.map((d) => d))]);
    this.svg.selectAll('.ydata').remove()
    this.svg.append('g').attr('class','ydata').call(d3.axisLeft(this.yaxis).ticks(5)).attr('transform', 'translate(30,0)');
    this.svg.selectAll('.bar').remove();
    this.svg.selectAll('.bar').data(this.counts).enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any, i: number) => this.xaxis(this.xData[i].toString()))
      .attr('y', (d: any) => this.yaxis(d))
      .attr('width', this.xaxis.bandwidth())
      .attr('height', (d: any) => this.height - this.yaxis(d))
      .attr('fill', '#211F9F')
      .attr('transform', 'translate(30,0)');
  }
 
  selectModel(url: any, model: any) {
    this.counts = []
    this.predictionscores = []
    this.modelpath = url
    this.selectedModelName = model
    this.getmodel();
  }
  getmodel() {
    this.models = []
    this.csv.get(this.modelpath, { responseType: 'text' }).subscribe(
      {
        next: (data: any) => {
          let modeldata = data.split('\r\n')
          for (let i = 1; i < modeldata.length - 1; i++) {
            let row = modeldata[i].split(',')
            this.models.push(new Models(row[0], row[1], row[2], row[3]))
          }
          this.models.map((e: any) => {
            if (e.predictedScore >= this.sliderValue && e.groundtruth === "real") {
              e.ConfusionMatrix = "TP"

            }
            else if (e.predictedScore >= this.sliderValue && e.groundtruth === "fake") {
              e.ConfusionMatrix = "FP"
            }
            else if (e.predictedScore < this.sliderValue && e.groundtruth === "fake") {
              e.ConfusionMatrix = "TN"
            }
            else {
              e.ConfusionMatrix = "FN"
            }
          })
          console.log(this.models)
          this.models.map((e: any) => {
            this.predictionscores.push(e.predictedScore)
          })
          console.log(this.predictionscores)
          this.counts.push(this.predictionscores.filter(e => e <= 0.1).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.1 && e <= 0.2).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.2 && e <= 0.3).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.3 && e <= 0.4).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.4 && e <= 0.5).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.5 && e <= 0.6).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.6 && e <= 0.7).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.7 && e <= 0.8).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.8 && e <= 0.9).length)
          this.counts.push(this.predictionscores.filter(e => e > 0.9 && e <= 1).length)


          console.log(this.counts)
          this.getlinechart()
          this.getbarchart()

          let nooftp = this.models.filter(e => e.ConfusionMatrix === 'TP')
          this.tpCount = nooftp.length
          console.log(this.tpCount)


          let noftn = this.models.filter(e => e.ConfusionMatrix === 'TN')
          this.tnCount = noftn.length


          let nooffp = this.models.filter(e => e.ConfusionMatrix === 'FP')
          this.fpCount = nooffp.length

          let nooffn = this.models.filter(e => e.ConfusionMatrix === 'FN')
          this.fnCount = nooffn.length
          this.accuracy = Math.floor(((this.tpCount + this.tnCount) / (this.tnCount + this.tpCount + this.fnCount + this.fpCount)) * 100)
          this.realaccuracy = Math.floor((this.tpCount / (this.tpCount + this.fpCount) * 100))
          this.fakeaccuracy = Math.floor(Math.floor(this.tnCount / (this.tnCount + this.fnCount) * 100))
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
  getTrainingsessions() {
    this.trainingSession.get(this.trainingsessionUrl).subscribe(
      {
        next: (data: any) => {
          let trainingsList = data.training_session_ids
          trainingsList.map((e: any) => {
            this.trainingids.push(e.SessionID)
            this.trainingSessions.push(e)
          })
          console.log(this.trainingids)
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
  selectOneOption(option: any) {
    this.trainingsessionName = this.trainingSessions.find((e: any) => e.SessionID === option)
  }

  logout() {
    this.router.navigate(['/'])

  }

  
}

