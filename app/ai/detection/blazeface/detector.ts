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

 async detect(
  image:string
 ):Promise<DetectionResult>{

  return {

   faceFound:false,

   faceCount:0,

   confidence:0,

   x:0,

   y:0,

   width:0,

   height:0

  };

 }

}
