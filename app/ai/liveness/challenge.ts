export interface ChallengeResult {

 challengePass:boolean;

 challengeType:string;

 completed:boolean;

}

export class ChallengeEngine {

 async generate():
 Promise<ChallengeResult>{

  return {

   challengePass:true,

   challengeType:"BLINK",

   completed:false

  };

 }

}
