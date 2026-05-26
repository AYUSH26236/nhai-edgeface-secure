export interface BlurResult {

 blurPass:boolean;

 blurScore:number;

 threshold:number;

}

export class BlurDetector {

 async check(
  image:string
 ):Promise<BlurResult>{

  return {

   blurPass:true,

   blurScore:1,

   threshold:0.7

  };

 }

}

