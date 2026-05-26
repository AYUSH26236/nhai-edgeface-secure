export interface FaceSizeResult {

 faceSizePass:boolean;

 width:number;

 height:number;

 minSize:number;

}

export class FaceSizeDetector {

 async check(
  image:string
 ):Promise<FaceSizeResult>{

  return {

   faceSizePass:true,

   width:0,

   height:0,

   minSize:112

  };

 }

}
