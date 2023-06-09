import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Models } from '../models';
import * as d3 from 'd3';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-modeltracking',
  templateUrl: './modeltracking.component.html',
  styleUrls: ['./modeltracking.component.css']
})
export class ModeltrackingComponent implements OnInit {
  constructor(public router: Router, public trainingSession: HttpClient, public csv: HttpClient,public modeltracker:Router,public image:HttpClient,
    public sanitize:DomSanitizer) { }
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
  name=sessionStorage.getItem("name")
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
  public margin = 30
  public margin2=50
  public xaxis: any
  public yaxis: any
  public zoomstatus:boolean=true
  zoomfn(){
    this.zoomstatus=!this.zoomstatus
  }
  getlinechart() {
    let id=document.getElementById('d3chart') as HTMLElement
    this.svg=d3.select(id)
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
  public thresholdstatus=false
  public alertmessage!:string
  public alertstatus!:boolean
  public abcd=true
  ok(){
   this.abcd=false
  }
  submitmodel(){
    this.abcd = true;
    if(this.thresholdstatus==true){
      this.modeltracker.navigateByUrl('/modeltracker')
    }
    else{
      this.alertmessage="Please select a model"
    }
  }

  selectModel(url: any, model: any) {
    this.thresholdstatus=true
    this.counts = []
    this.predictionscores = []
    this.modelpath = url
    this.selectedModelName = model
    this.getmodel();
    this.circularplot()

  }
  onSliderChange(event: any) {
    this.sliderValue = event.target.value
    this.getmodel()
  }
  circularplot() {
    let progressbar1: any = document.querySelector('.progressbar1')
    let value1: any = document.querySelector('.value1')
    let progressbar2: any = document.querySelector('.progressbar2')
    let value2: any = document.querySelector('.value2')
    let progressbar3: any = document.querySelector('.progressbar3')
    let value3: any = document.querySelector('.value3')

    let accuracystarting = 1
    let clearaccuracy = setInterval(() => {
      accuracystarting += 1;
      progressbar1.style.background = `conic-gradient(#211F9F ${accuracystarting * 3.6}deg,#FFF 0deg)`
      value1.innerHTML = `${accuracystarting}%`
      if (accuracystarting == this.accuracy) {
        clearInterval(clearaccuracy)

      }
    })

    let realaccurayStarting = 1;
    let clearRealAccuracy = setInterval(() => {
      realaccurayStarting += 1
      progressbar2.style.background = `conic-gradient(#211F9F ${realaccurayStarting * 3.6}deg, #FFF 0deg)`
      value2.innerHTML = `${realaccurayStarting}%`
      if (realaccurayStarting == this.realaccuracy) {
        clearInterval(clearRealAccuracy)
      }
    })

    let fakeaccuracyStarting = 1
    let fakeaccuracyClear = setInterval(() => {
      fakeaccuracyStarting += 1
      progressbar3.style.background = `conic-gradient(#211F9F ${fakeaccuracyStarting * 3.6}deg, #FFF 0deg)`
      value3.innerText = `${fakeaccuracyStarting}%`
      if (fakeaccuracyStarting == this.fakeaccuracy) {
        clearInterval(fakeaccuracyClear)
      }
    })
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
