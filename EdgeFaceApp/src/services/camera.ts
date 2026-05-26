export interface CameraFrame {

 image:string;

 timestamp:string;

 width:number;

 height:number;

}

export class CameraService {

 async capture():
 Promise<CameraFrame>{

  return {

   image:"",

   timestamp:
    new Date()
    .toISOString(),

   width:0,

   height:0

  };

 }

}
