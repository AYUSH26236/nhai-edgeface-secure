import * as blazeface from
"@tensorflow-models/blazeface";

export interface DetectionResult {

 faceFound:boolean;

 faceCount:number;

 confidence:number;

 x:number;

 y:number;

 width:number;

 height:number;

}

export class BlazeFaceDetector {

 private model:any;

 async loadModel(){

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

  if(
   predictions.length===0
  ){

   return{

    faceFound:false,

    faceCount:0,

    confidence:0,

    x:0,

    y:0,

    width:0,

    height:0

   };

  }

  const face=
  predictions[0];

  return{

   faceFound:true,

   faceCount:
   predictions.length,

   confidence:1,

   x:0,

   y:0,

   width:0,

   height:0

  };

 }

}