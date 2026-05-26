export interface MobileFaceNetResult {

 modelLoaded:boolean;

 inferenceTime:number;

 confidence:number;

}

export class MobileFaceNet {

 async infer(
  image:string
 ):Promise<MobileFaceNetResult>{

  return {

   modelLoaded:false,

   inferenceTime:0,

   confidence:0

  };

 }

}
