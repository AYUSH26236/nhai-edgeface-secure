export interface HeadTurnResult {

 headTurnPass:boolean;

 direction:string;

 angle:number;

}

export class HeadTurnDetector {

 async check(
  image:string
 ):Promise<HeadTurnResult>{

  return {

   headTurnPass:true,

   direction:"CENTER",

   angle:0

  };

 }

}
