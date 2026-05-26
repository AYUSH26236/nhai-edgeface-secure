export interface FAISSResult {

 found:boolean;

 nearestId:string;

 distance:number;

}

export class FAISSMatcher {

 async search(
  embedding:number[]
 ):Promise<FAISSResult>{

  return {

   found:false,

   nearestId:"",

   distance:0

  };

 }

}
