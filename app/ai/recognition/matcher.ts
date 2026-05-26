export interface MatchResult {

 matched:boolean;

 confidence:number;

 workerId:string;

}

export class Matcher {

 async match(
  embedding:number[]
 ):Promise<MatchResult>{

  return {

   matched:false,

   confidence:0,

   workerId:""

  };

 }

}
