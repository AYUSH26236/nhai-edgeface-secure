export interface OcclusionResult {

 occlusionPass:boolean;

 eyesVisible:boolean;

 noseVisible:boolean;

 mouthVisible:boolean;

 score:number;

}

export class OcclusionDetector {

 async check(
  image:string
 ):Promise<OcclusionResult>{

  return {

   occlusionPass:true,

   eyesVisible:true,

   noseVisible:true,

   mouthVisible:true,

   score:1

  };

 }

}
