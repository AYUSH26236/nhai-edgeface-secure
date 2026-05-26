import {
 LivenessResult
}
from "../types/liveness";

export class LivenessService {

 async checkLiveness(
  image:string
 ):Promise<LivenessResult>{

  return {

   blinkPass:true,

   smilePass:true,

   headTurnPass:true,

   challengePass:true,

   challengeType:
   "BLINK",

   duration:0

  };

 }

}
