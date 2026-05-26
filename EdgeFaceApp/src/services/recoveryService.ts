import {
 RecoveryResult
}
from "../types/recovery";

export class RecoveryService {

 async recover(
  image:string
 ):Promise<RecoveryResult>{

  return {

   partialMatchUsed:false,

   fullVectorFallback:false,

   eyesScore:0,

   noseScore:0,

   mouthScore:0,

   finalConfidence:0

  };

 }

}
