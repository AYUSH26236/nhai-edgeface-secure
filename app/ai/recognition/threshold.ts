export interface ThresholdResult {

 accepted:boolean;

 threshold:number;

 score:number;

}

export class ThresholdEngine {

 async evaluate(
  score:number
 ):Promise<ThresholdResult>{

  return {

   accepted:false,

   threshold:0.7,

   score

  };

 }

}
