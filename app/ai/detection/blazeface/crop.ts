import { FaceBox }
from "./face_box";

export interface CropResult {

 cropped:boolean;

 width:number;

 height:number;

 image:string;

 faceBox:FaceBox;

}

export class FaceCrop {

 async crop(
  image:string,

  faceBox:FaceBox

 ):Promise<CropResult>{

  return {

   cropped:false,

   width:0,

   height:0,

   image:"",

   faceBox

  };

 }

}
