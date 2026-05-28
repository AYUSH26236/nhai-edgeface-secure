export interface SmileResult {

 smilePass:boolean;

 smileScore:number;

 threshold:number;

}

export class SmileDetector {

 async check(
  image:string
 ):Promise<SmileResult>{

  return {

   smilePass:true,

   smileScore:1,

   threshold:0.7

  };

 }

}
