import { FaceBox }
from "./face_box";

export interface MultiFaceResult {

 faceCount:number;

 faces:FaceBox[];

 primaryFace?:FaceBox;

 multipleDetected:boolean;

}

export class MultiFaceHandler {

 async process(
  image:string
 ):Promise<MultiFaceResult>{

  return {

   faceCount:0,

   faces:[],

   primaryFace:undefined,

   multipleDetected:false

  };

 }

}
