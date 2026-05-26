export interface PartialMatchResult {

 partialMatchUsed:boolean;

 eyesScore:number;

 noseScore:number;

 mouthScore:number;

 success:boolean;

}

export class PartialMatcher {

 async match(
  image:string
 ):Promise<PartialMatchResult>{

  return {

   partialMatchUsed:false,

   eyesScore:0,

   noseScore:0,

   mouthScore:0,

   success:false

  };

 }

}
