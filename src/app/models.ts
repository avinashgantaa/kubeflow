export class Models {
    public imagename:any;
    public predictedScore:any
    public groundtruth:any
    public ConfusionMatrix:any
    constructor(img:any,predscore:any,gt:any,cm:any){
        this.imagename=img
        this.predictedScore=predscore
        this.groundtruth=gt
        this.ConfusionMatrix=cm
    }
}
