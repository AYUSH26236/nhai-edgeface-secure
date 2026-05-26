import * as blazeface from
"@tensorflow-models/blazeface";

export interface DetectionResult{

 faceFound:boolean;

 faceCount:number;

 confidence:number;

 x:number;

 y:number;

 width:number;

 height:number;

}

export class BlazeFaceDetector{

 private model:any;

 async loadModel(){

  console.log(
   "Loading BlazeFace..."
  );

  this.model=
  await blazeface.load();

 }

 async detect(
  image:any

 ):Promise<DetectionResult>{

  if(
   !this.model
  ){

   await this.loadModel();

  }

  const predictions=
  await this.model
  .estimateFaces(
   image,
   false
  );

  console.log(
   predictions
  );

  return{

   faceFound:
   predictions.length>0,

   faceCount:
   predictions.length,

   confidence:
   predictions.length
   ?1
   :0,

   x:0,

   y:0,

   width:0,

   height:0

  };

 }

}