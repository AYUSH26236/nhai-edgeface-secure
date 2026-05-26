import { FaceBox }
from "./face_box";

export interface AlignmentResult {

 aligned:boolean;

 rotation:number;

 leftEyeX:number;

 leftEyeY:number;

 rightEyeX:number;

 rightEyeY:number;

 faceBox:FaceBox;

}

export class FaceAlignment {

 async align(
  image:string,

  faceBox:FaceBox

 ):Promise<AlignmentResult>{

  return {

   aligned:false,

   rotation:0,

   leftEyeX:0,

   leftEyeY:0,

   rightEyeX:0,

   rightEyeY:0,

   faceBox

  };

 }

}
