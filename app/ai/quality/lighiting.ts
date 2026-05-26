export interface LightingResult {

 lightingPass:boolean;

 brightness:number;

 threshold:number;

}

export class LightingDetector {

 async check(
  image:string
 ):Promise<LightingResult>{

  return {

   lightingPass:true,

   brightness:1,

   threshold:0.5

  };

 }

}
