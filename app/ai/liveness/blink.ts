export interface BlinkResult {

 blinkPass:boolean;

 blinkCount:number;

 leftEyeOpen:boolean;

 rightEyeOpen:boolean;

}

export class BlinkDetector {

 async check(
  image:string
 ):Promise<BlinkResult>{

  return {

   blinkPass:true,

   blinkCount:0,

   leftEyeOpen:true,

   rightEyeOpen:true

  };

 }

}
